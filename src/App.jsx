import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Header from './components/Header'
import SignUp from './pages/SignUp'
import Home from './pages/Home'
import AllCVs from './pages/AllCVs'
import CVDetails from './pages/CVDetails'

function App() {
  return (
    <>
    <Header/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/allcvs' element={<AllCVs/>}/>
      <Route path='/cv/:id' element={<CVDetails/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<SignUp/>}/>
    </Routes>
    </>
  )
}

export default App
