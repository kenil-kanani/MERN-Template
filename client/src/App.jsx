
import { Route, Routes } from 'react-router-dom'
import './App.css'
import AppRouter from './AppRouter'
import { AdminDashboard, ForgotPassword, Home, SignIn, SignUp, UserDashboard } from './pages'
import { Toaster } from './components/ui/toaster'
import { FirstLoading, NavBar } from './components'
import AppContext from './context/AppContext'
import { useContext } from 'react'

function App() {

  const { isLoading } = useContext(AppContext)

  return (
    <>
      {
        isLoading ? <FirstLoading /> : (
          <>
            <Toaster />
            <NavBar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/user-dashboard" element={<UserDashboard />} />
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
            </Routes>
          </>
        )
      }
    </>
  )
}

export default App
