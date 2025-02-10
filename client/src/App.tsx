import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import BookSubmitForm from './components/BookSubmitForm'
import BookInformation from './components/BookInformation'

function App() {
  return (
    <>
      <h1>Books</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<BookSubmitForm />}/>
          <Route path="/book/:id" element={<BookInformation/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
