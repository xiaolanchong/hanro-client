import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
//import { MatrixList } from './MatrixList.js'
//import { Matrix } from './Matrix.js'
import { MainPage } from './MainPage'
import { NavBar } from './NavBar'

function Error() {
   return (
            <div className='text-center'>
               <h1>404</h1>
               <h2>Нет такой страницы</h2>
            </div>
          );
}

function App() {
  // <Route path="/matrix" component={Matrix}/>
  return (
      <BrowserRouter>
         <NavBar />
            <Routes>
              <Route path="/" element={<MainPage />} />         
              <Route element={<Error />}>
              </Route>
           </Routes>
      </BrowserRouter>
  );
}

export default App;
