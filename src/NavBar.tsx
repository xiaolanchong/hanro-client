import React, { useState, useEffect } from 'react'
import {Modal, Button, Form} from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { getUser } from './Server'

const AuthControl = () => {
   const [username, setUsername] = useState<string|undefined>(undefined);
   //const history = useHistory();
   
   useEffect(() => {
      userGetter();
   });

   const userGetter = async () => {
      const username = await getUser().getName();
      setUsername(username);
   }
   
   const onLogout = () => {
      getUser().logout();
      setUsername(undefined);
     // history.push('/');
   }
   
   return (username === undefined)
            ? (
               <span className="float-end text-center ">
                  <Login />
                  <Button variant="secondary m-2">Регистрация</Button>
               </span>
            )
            : (
               <span className="float-end">
                  <Button variant="link">{username}</Button>
                  <Button variant="secondary m-2" onClick={onLogout}>Выход</Button>
               </span>
            );
}

function Login() {
  const [show, setShow] = useState<boolean>(false);
  const [username, setUsername] = useState<string|undefined>();
  const [password, setPassword] = useState<string|undefined>();
  const [rememberMe, setRememberMe] = useState<boolean>(true);
  //const history = useHistory();
  
   useEffect(() => {
      if(username === undefined){
         //deckGetter();
      }
   });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const login = () => {
        if (username !== undefined && password !== undefined)
            getUser().login(username, password, rememberMe).then(() => {
                setUsername(username);
            //history.push('/');
        });
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Вход
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Вход в систему</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <Form>
           <Form.Group controlId="formBasicName">
             <Form.Control type="input" placeholder="Имя" onChange={ (e) => setUsername(e.target.value) } />
           </Form.Group>

           <Form.Group controlId="formBasicPassword">
             <Form.Control type="password" placeholder="Пароль" onChange={ (e) => setPassword(e.target.value) } />
           </Form.Group>
           <Form.Group controlId="formBasicCheckbox">
             <Form.Check type="checkbox" label="Запомнить" onChange={(e) => setRememberMe(e.target.checked)} />
           </Form.Group>
         </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={ () => { handleClose(); login(); } }>
            Вход
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Отмена
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

class NavBar extends React.Component {
   render() {
      return (
         <header>
            <nav className='p-1 bg-dark'>
               <img className=' m-2' src='/korean-russian-flag.png' alt='logo' width='32' height='32' />
               <NavLink to='/' className=' m-2'>На главную</NavLink>
               <NavLink to='/content' className=' m-2'>Содержание</NavLink>
               <NavLink to='/about' className=' m-2'>О словаре</NavLink>
               <AuthControl />
            </nav>
         </header>
      );
   }
}

export { NavBar };