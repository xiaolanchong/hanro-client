import { useState, useEffect } from 'react'
import {Modal, Button, Form} from 'react-bootstrap'
import {Navbar, Container, Nav} from 'react-bootstrap'
import { getUser } from './Server'
import './NavBar.css'

const AuthControl = () => {
   const [username, setUsername] = useState<string|undefined>(undefined)
   
   useEffect(() => {
      userGetter()
   });

   const userGetter = async () => {
      const username = await getUser().getName();
      setUsername(username);
   }
   
   const onLogout = () => {
      getUser().logout()
      setUsername(undefined)
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
          <Button variant="primary" className="primary-dark"  onClick={ () => { handleClose(); login(); } }>
            Вход
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