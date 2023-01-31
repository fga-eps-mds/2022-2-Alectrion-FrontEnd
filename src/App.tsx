/* eslint-disable no-unused-vars */
import { CssBaseline, ThemeProvider } from '@mui/material'
import { SignRoutes } from './routes/routes'
import { theme } from './styles/theme'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import { AuthProvider } from './contexts/auth'
import * as React from 'react'
import events from 'events'

import ReactDOM from 'react-dom'

function App() {
  const events2 = [
    'load',
    'mousemove',
    'mousedown',
    'click',
    'scroll',
    'keypress'
  ]

  let timer: any
  // eslint-disable-next-line no-unused-vars
  let timer2: any

  const handleLogoutTimer = () => {
    timer = setTimeout(() => {
      resetTimer()
      Object.values(events2).forEach((item) => {
        window.removeEventListener(item, resetTimer)
      })
      toast.warn(
        'Você será desconectado por inatividade em 1 minuto, clique aqui para continuar logado!',
        {
          position: 'top-right',
          autoClose: 60000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined
        }
      )
      timer2 = setTimeout(() => {
        localStorage.clear()
        sessionStorage.clear()
        window.location.pathname = '/login'
      }, 60000)
    }, 1140000)
  }

  const resetTimer = () => {
    if (timer) clearTimeout(timer)
  }

  React.useEffect(() => {
    Object.values(events2).forEach((item) => {
      window.addEventListener(item, () => {
        resetTimer()
        handleLogoutTimer()
      })
    })
  }, [])
  React.useEffect(() => {
    const handleTabClose =(event: { preventDefault: () => void; returnValue: string }) => {
      event.preventDefault();

      return (event.returnValue =  " " );
    };

    window.addEventListener('beforeunload', handleTabClose);

    return () => {
      window.removeEventListener('beforeunload', handleTabClose);
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <SignRoutes />
      </AuthProvider>
      <ToastContainer />
    </ThemeProvider>
  )
}
export default App
