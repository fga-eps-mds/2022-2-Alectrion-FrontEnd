import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation
} from 'react-router-dom'
import UserLoginScreen from '../pages/user-login-screen'
import { ReactNode, useContext } from 'react'
import { AuthContext } from '../contexts/auth'
import { Task } from '../pages/task/index'
import UserRegister from '../pages/user-register'
import ScreenUser from '../pages/user-screen'
import EditUser from '../pages/EditUser'
import NavBar from '../components/NavBar'
import ScreenEquipaments from '../pages/ScreenEquipaments'
import OrderRegister from '../pages/order-service'
import { CircularProgress } from '@mui/material'
import EquipRegister from '../pages/equipment-register'
import { OrderServices } from '../pages/order-services'
import PasswordRecovery from '../pages/PasswordRecovery'
type AuthRouteProps = {
  children: ReactNode
}

export const SignRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <AuthRoutes>
              <NavBar />
              <Task />
            </AuthRoutes>
          }
        />
        <Route
          path="/user-register"
          element={
            <AuthRoutes>
              <NavBar />
              <UserRegister />
            </AuthRoutes>
          }
        />
        <Route
          path="/users"
          element={
            <AuthRoutes>
              <NavBar />
              <ScreenUser />
            </AuthRoutes>
          }
        />
        <Route
          path="/edit-user"
          element={
            <AuthRoutes>
              <NavBar />
              <EditUser />
            </AuthRoutes>
          }
        />
        <Route
          path="/order-services"
          element={
            <AuthRoutes>
              <NavBar />
              <OrderServices />
            </AuthRoutes>
          }
        />
        <Route
          path="/equipaments"
          element={
            <AuthRoutes>
              <NavBar />
              <ScreenEquipaments />
            </AuthRoutes>
          }
        />
        <Route
          path="/users"
          element={
            <AuthRoutes>
              <NavBar />
              <ScreenUser />
            </AuthRoutes>
          }
        />
        <Route
          path="/equipment-register"
          element={
            <AuthRoutes>
              <NavBar />
              <EquipRegister />
            </AuthRoutes>
          }
        />
        <Route
          path="/create-order-service"
          element={
            <AuthRoutes>
              <NavBar />
              <OrderRegister />
            </AuthRoutes>
          }
        />
        <Route path="/login" element={<UserLoginScreen />} />
        <Route path="/password-recovery" element={<PasswordRecovery />} />
      </Routes>
    </BrowserRouter>
  )
}

export function AuthRoutes({ children }: AuthRouteProps): any {
  const { isAuthenticated } = useContext(AuthContext)
  const location = useLocation()
  return isAuthenticated === 'authenticated' ? (
    children
  ) : isAuthenticated === 'waiting' ? (
    <CircularProgress />
  ) : (
    <Navigate to="/login" replace state={{ path: location.pathname }} />
  )
}
