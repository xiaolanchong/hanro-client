import { useState, useEffect } from 'react'
import {Modal, Button, Form, Alert, Navbar, Container, Nav} from 'react-bootstrap'
import { getUser } from './Server'
import { Registration } from './navbar/Registration'
import './NavBar.css'

const AuthControl = () => {
   const [username, setUsername] = useState<string|undefined>(undefined)
   
   useEffect(() => {
      const userGetter = async () => {
         const userInfo = await getUser().getUserInfo()
         if (userInfo === undefined)
            setUsername(undefined)
         else
            setUsername(userInfo.username)
      }
      userGetter()
   }, []);
   
   const onLogout = async () => {
      await getUser().logout()
      setUsername(undefined)
   }
   
   return (username === undefined)
            ? (
               <span className="float-end text-center ">
                  <Registration onRegistered={username =>setUsername(username) } />                  
                  <Login onLoggedIn={ username =>setUsername(username)  } />
               </span>
            )
            : (
               <span className="float-end">
                  <Button variant="link">{username}</Button>
                  <Button variant="secondary m-2" onClick={onLogout}>Выход</Button>
               </span>
            );
}

type LoginErrorAlertParams = {
   loginError: string
}

function LoginErrorAlert({loginError}: LoginErrorAlertParams) {
     return (
       <Alert variant="danger" onClose={() => {}} >
         <span>{loginError}</span>
       </Alert>
     );
 }

type LoginParams = {
   onLoggedIn: (username: string) => void
}

function Login({onLoggedIn}: LoginParams) {
  const [show, setShow] = useState<boolean>(false)
  const [username, setUsername] = useState<string|undefined>()
  const [password, setPassword] = useState<string|undefined>()
  const [rememberMe, setRememberMe] = useState<boolean>(true)
  const [loginError, setLogonError] = useState<string|undefined>()

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const login = () => {
        if (username !== undefined && password !== undefined)
            getUser().login(username, password, rememberMe).then((loginRes) => {
               if (loginRes === undefined) {
                  setLogonError('Unknown error')
               }
               if (loginRes.success) {
                  onLoggedIn(loginRes.username);
                  setLogonError(undefined)
                  handleClose()
               } else if (loginRes.message !== undefined) {
                  setLogonError(loginRes.message)
               } else
                  setLogonError('Unknown error')
            });
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Войти
      </Button>

      <Modal className='dark-modal' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Войти в систему</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <Form>
           <Form.Group controlId="formBasicName">
             <Form.Control type="input" placeholder="Имя" onChange={ (e) => setUsername(e.target.value) } />
           </Form.Group>

           <Form.Group controlId="formBasicPassword">
             <Form.Control type="password" placeholder="Пароль" onChange={ (e) => setPassword(e.target.value) } />
           </Form.Group>
           <Form.Group  controlId="formBasicCheckbox">
             <Form.Check className='mt-2' type="checkbox" label="Запомнить" onChange={(e) => setRememberMe(e.target.checked)} />
           </Form.Group>
         </Form>
         {
            loginError !== undefined ? <LoginErrorAlert loginError={loginError} /> : <></>
         }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" className="primary-dark"  onClick={ () => { login(); } }>
            Войти
          </Button>
          <Button variant="secondary" className="secondary-dark" onClick={handleClose}>
            Отмена
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

const NavBar = () => {
   return <Navbar bg="dark" variant="dark">
   <Container>
      <Navbar.Brand href="/">
         <img
            alt="logo"
            src="/korean-russian-flag.png"
            width="32"
            height="32"
            className="d-inline-block align-top"
         />{' '}
         Ханро
      </Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link href="/index">Содержание</Nav.Link>
      </Nav>
      <AuthControl />
   </Container>
 </Navbar>
}

export { NavBar };