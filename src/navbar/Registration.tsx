import { useState } from "react"
import {Modal, Button, Form, Alert} from 'react-bootstrap'
import { getUser } from '../Server'

type RegistrationErrorAlertParams = {
    registrationError: string
 }
 
 function RegistrationErrorAlert({registrationError}: RegistrationErrorAlertParams) {
      return (
        <Alert variant="danger" onClose={() => {}} >
          <span>{registrationError}</span>
        </Alert>
      );
  }

type RegistrationParams = {
    onRegistered: (username:string) => void
}

const Registration = ({onRegistered}: RegistrationParams) => {
    
    const [username, setUsername] = useState<string|undefined>()
    const [password, setPassword] = useState<string|undefined>()
    const [email, setEmail] = useState<string|undefined>()
    const [registrationError, setRegistrationError] = useState<string|undefined>()
    const [show, setShow] = useState<boolean>(false)
  
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    const register = () => {
          if (username !== undefined && password !== undefined)
              getUser().register(username, password, email).then((regRes) => {
                 if (regRes === undefined) {
                    setRegistrationError('Unknown error')
                 }
                 if (regRes.success) {
                    onRegistered(regRes.username);
                    setRegistrationError(undefined)
                    handleClose()
                 } else if (regRes.message !== undefined) {
                    setRegistrationError(regRes.message)
                 } else
                 setRegistrationError('Unknown error')
              });
    }
  
    return (
      <>
        <Button variant="secondary" className="m-2" onClick={handleShow}>
          Регистрация
        </Button>
  
        <Modal className='dark-modal' show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Создание нового пользователя</Modal.Title>
          </Modal.Header>
          <Modal.Body>
           <Form>
             <Form.Group controlId="formBasicName">
               <Form.Control type="input" placeholder="Имя" onChange={ (e) => setUsername(e.target.value) } />
             </Form.Group>
  
             <Form.Group controlId="formBasicPassword">
               <Form.Control type="password" placeholder="Пароль" onChange={ (e) => setPassword(e.target.value) } />
             </Form.Group>

             <Form.Group controlId="formBasicPassword">
               <Form.Control type="input" placeholder="Эл. почта" onChange={ (e) => setEmail(e.target.value) } />
             </Form.Group>
           </Form>
           {
              registrationError !== undefined ? <RegistrationErrorAlert registrationError={registrationError} /> : <></>
           }
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" className="primary-dark"  onClick={ () => { register(); } }>
              Создать
            </Button>
            <Button variant="secondary" className="secondary-dark" onClick={handleClose}>
              Отмена
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

export {Registration}
