import { AxiosResponse } from 'axios'
import { createContext, useState, ReactNode, useEffect } from 'react'
import api from '../api/config'

type LoginResponse = {
  token: string
  expireIn: string
  email: string
  name: string
  role: string
  job?: string
}

type SignInProps = {
  username: string
  password: string
}

type AuthContextData = {
  user: LoginResponse | null
  isAuthenticated: 'authenticated' | 'waiting' | 'unauthenticated'
  Login: (credentials: SignInProps) => Promise<void>
  Logout(): void
}

type AuthProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<LoginResponse | null>(null)
  const [authState, setAuthState] = useState<
    'authenticated' | 'waiting' | 'unauthenticated'
  >('waiting')

  useEffect(() => {
    const storagedUser = localStorage.getItem('@App:user')
    const storagedToken = localStorage.getItem('@App:token')

    if (storagedToken && storagedUser) {
      setUser(JSON.parse(storagedUser))
      setAuthState('authenticated')
      api.defaults.headers.common.Authorization = `Bearer ${storagedToken}`
    } else setAuthState('unauthenticated')
  }, [user?.token])

  async function Login(userData: object) {
    const { data }: AxiosResponse<LoginResponse> = await api.post(
      '/user/login',
      userData
    )
    const { token, expireIn, email, name, role, job } = data
    setAuthState('authenticated')
    setUser({ token, expireIn, email, name, role, job })
    localStorage.setItem(
      '@App:user',
      JSON.stringify({ token, expireIn, email, name, role, job })
    )
    localStorage.setItem('@App:token', token)

    api.defaults.headers.common.Authorization = 'Bearer ' + token
  }

  function Logout() {
    setUser(null)
    setAuthState('unauthenticated')
    localStorage.clear()
    sessionStorage.clear()
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated: authState, user, Login, Logout }}>
      {children}
    </AuthContext.Provider>
  )
}
