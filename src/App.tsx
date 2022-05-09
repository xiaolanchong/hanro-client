import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { MainPage } from './MainPage'
import { AboutPage } from './AboutPage'
import { LetterIndexPage } from './LetterIndexPage'
import { SyllableIndexPage } from './SyllableIndexPage'
import { WordListPage } from './WordListPage'
import { WordPage } from './WordPage'
import { SearchResultPage } from './SearchResultPage'
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
  return (
      <BrowserRouter>
         <NavBar />
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/content" element={<LetterIndexPage /> } />
              <Route path="/content/:startWith" element={<SyllableIndexPage /> } />
              <Route path="/wordlist/:startWith" element={<WordListPage /> } />
              <Route path="/word/:word" element={<WordPage /> } />
              <Route path="/search/:word" element={<SearchResultPage /> } />
              <Route element={<Error />} />
           </Routes>
      </BrowserRouter>
  );
}

export default App;
