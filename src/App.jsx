import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './layout/Layout'
import Dashboard from './pages/Dashboard/Dashboard'
import SignIn from './pages/signIn/SignIn'
import HandleAuth from './auth/HandleAuth'
// import Home from './pages/Home/Home'

function App () {
  return (
    <Routes>
      <Route path='login' element={<SignIn />} />
      <Route element={<HandleAuth />}>
        <Route element={<Layout />}>
          <Route
            index
            path='/'
            element={<Navigate to='/dashboard' replace />}
          />
          <Route path='dashboard' element={<Dashboard />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
