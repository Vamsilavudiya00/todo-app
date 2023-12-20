import './App.css'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import NavBar from './components/NavBar'
import CreateTodoPage from './pages/CreateTodoPage'
import EditPost from './pages/EditPost'

function App() {

  return (
    <>
    <NavBar />
      <Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path='/create-post' element={<CreateTodoPage />}/>
        <Route path='/:uid' element={<EditPost />}/>
      </Routes>
      {/* <Footer /> */}
    </>
  )
}

export default App
