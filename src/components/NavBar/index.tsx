import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import Stack from '@mui/material/Stack'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import img from './assets/AlectrionLogo2.png'
import { AuthContext } from '../../contexts/auth'
import { stringAvatar } from '../../utils/utils'

interface AuthContextType {
  user: {
    role: string
    name: string
  }
}

const NavBar = () => {
  const navigate = useNavigate()
  const { Logout } = React.useContext(AuthContext)
  const { user } = React.useContext(AuthContext) as AuthContextType

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  return (
    <AppBar position="static" sx={{ backgroundColor: '#1F3541' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Button
            data-testid="buttonAlectrion"
            onClick={() => navigate('/')}
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}>
            <Box
              component="img"
              sx={{
                height: 60,
                width: 155,
                mt: 0.5,
                mb: 1
              }}
              alt=""
              src={img}
            />
          </Button>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit">
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left'
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' }
              }}>
              <MenuItem key={''} onClick={handleCloseNavMenu}>
                <Button
                  data-testid="buttonEquipaments"
                  key={''}
                  href="/equipaments"
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'black', display: 'block' }}>
                  Equipamentos
                </Button>
              </MenuItem>
              <MenuItem key={''} onClick={handleCloseNavMenu}>
                <Button
                  data-testid="buttonOrderService"
                  key={''}
                  href="/orderservice"
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'black', display: 'block' }}>
                  Ordem de Serviço
                </Button>
              </MenuItem>
              <MenuItem key={''} onClick={handleCloseNavMenu}>
                <Button
                  data-testid="buttonUsers"
                  key={''}
                  href="/users"
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'black', display: 'block' }}>
                  Usuários
                </Button>
              </MenuItem>
            </Menu>
          </Box>
          <Typography
            data-testeid="logoAlectrion"
            variant="h5"
            noWrap
            component="a"
            onClick={() => navigate('/')}
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none'
            }}>
            <Box
              component="img"
              sx={{
                height: 60,
                width: 155,
                mb: 1,
                mt: 0.5
              }}
              alt=""
              src={img}
            />
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'flex' },
              justifyContent: 'flex-end'
            }}>
            <Button
              data-testid="buttonEquipamentsPC"
              onClick={() => navigate('/equipaments')}
              sx={{ my: 2, color: 'white', display: 'block' }}>
              Equipamentos
            </Button>
            <Button
              data-testid="buttonOrderServicePC"
              key={''}
              onClick={() => navigate('/order-services')}
              sx={{ my: 2, color: 'white', display: 'block' }}>
              Ordem de Serviço
            </Button>
            <Button
              data-testid="buttonMovimentsPC"
              onClick={() => navigate('/movimentacoes')}
              sx={{ my: 2, color: 'white', display: 'block' }}>
              Movimentações
            </Button>            
              <Button
                data-testid="buttonUsersPC"
                key={''}
                onClick={() => navigate('/users')}
                sx={{ my: 2, color: 'white', display: 'block' }}>
                Usuários
              </Button>

 
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Sair">
              <IconButton
                data-testid="buttonExit"
                onClick={Logout}
                sx={{ p: 0, mr: 3, ml: 5, color: 'white' }}>
                <ExitToAppIcon></ExitToAppIcon>
              </IconButton>
            </Tooltip>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Usuário">
              <IconButton
                data-testid="buttonUser"
                onClick={() => navigate('/user')}
                sx={{ p: 0 }}>
                <Stack direction="row">
                  <Avatar {...stringAvatar(user.name)} />
                </Stack>
              </IconButton>
            </Tooltip>
          </Box>
          <Box sx={{ ml: '15px' }}>
            <Typography>{user.name}</Typography>
            <Typography>{user.role}</Typography>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default NavBar
