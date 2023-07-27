import { getSession, useSession } from 'next-auth/react';
import { useState } from 'react'
 
import { useRouter } from 'next/router'
// ** MUI Imports
import Box from '@mui/material/Box'
import { Theme } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import useMediaQuery from '@mui/material/useMediaQuery'
import InputAdornment from '@mui/material/InputAdornment'

// ** Icons Imports
import Menu from 'mdi-material-ui/Menu'
import Magnify from 'mdi-material-ui/Magnify'

// ** Type Import
import { Settings } from 'src/@core/context/settingsContext'

// ** Components
import ModeToggler from 'src/@core/layouts/components/shared-components/ModeToggler'
import UserDropdown from 'src/@core/layouts/components/shared-components/UserDropdown'
import NotificationDropdown from 'src/@core/layouts/components/shared-components/NotificationDropdown'

// custom

import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'

import MenuItem from '@mui/material/MenuItem'

import Chip from '@mui/material/Chip'
import DomainDropdown from 'src/@core/layouts/components/shared-components/DomainDropdown';
import HostingDropdown from 'src/@core/layouts/components/shared-components/HostingDropdown'
import CloudDropdown from 'src/@core/layouts/components/shared-components/CloudDropdown'
import EmailsDropdown from 'src/@core/layouts/components/shared-components/EmailsDropdown'
import SecurityDropdown from 'src/@core/layouts/components/shared-components/SecurityDropdown'
import WebsitesDropdown from 'src/@core/layouts/components/shared-components/WebsitesDropdown'

interface Props {
  hidden: boolean
  settings: Settings
  toggleNavVisibility: () => void
  saveSettings: (values: Settings) => void
}

const styles = {
  py: 2,
  px: 4,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  color: 'text.primary',
  textDecoration: 'none',
  '& svg': {
    fontSize: '1.375rem',
    color: 'text.secondary'
  }
}

const AppBarContent = (props: Props) => {
  // ** Props
  const { hidden, settings, saveSettings, toggleNavVisibility } = props;

  // ** Hook
  const hiddenSm = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  const { data: session, status } = useSession();

  const userLoggedIn = session !== null && status !== 'loading';

  // ** States
  const [anchorEl, setAnchorEl] = useState(null);
  const router = useRouter();
  
  const [activeMenu, setActiveMenu] = useState(null);

  const handleDropdownToggle = (index) => {
    if (activeMenu === index) {
      setActiveMenu(null);
    } else {
      setActiveMenu(index);
    }
  };

  
  const handleOutsideClick = () => {
    setActiveMenu(null);
  };


  

  return (
    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',  position: 'relative' }}>
      <Box className='actions-left' sx={{ mr: 2, display: 'flex', alignItems: 'center',  position: 'relative' }}>
        {hidden ? (
          <IconButton
            color='inherit'
            onClick={toggleNavVisibility}
            sx={{ ml: -2.75, ...(hiddenSm ? {} : { mr: 3.5 }) }}
          > 
            <Menu />
          </IconButton>
        ) : null}

        {hidden ?  ( <a href="/"> <img src="/images/logo.png" width="200px" height="50" /></a> ) : (
          <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',  position: 'relative' }}>
            <Box className='actions-right' sx={{ mr: 2, display: 'flex', alignItems: 'center',  position: 'relative' }}>
            <a href="/"> <img src="/images/logo.png" width="200px" height="50" /></a>
              </Box>
            <Box className='actions-right' sx={{ mr: 2, display: 'flex', alignItems: 'center',  position: 'relative' }}>
            <MenuItem sx={{ p: 0 }}>
          <Button
            size='small'
            variant='contained'
            component='a'
            rel='noreferrer'
            sx={{           
              p: 4,
              mr: 2,
              display: 'flex',
              height: 30,
              fontSize: '1rem',
              textTransform: 'capitalize',
              fontWeight: 1000,
              backgroundColor: activeMenu === 'domain' ? '#602c3b' : 'primary.main',
              zIndex: activeMenu === 'domain' ? '9999' : 'auto',
            }}
            onClick={() => handleDropdownToggle('domain')}
          >
            <DomainDropdown active={activeMenu === 'domain'} />
          </Button>
        </MenuItem>
        <MenuItem sx={{ p: 0 }}>
          <Button
            size='small'
            variant='contained'
            component='a'
            target='_blank'
            rel='noreferrer'
            sx={{
              p: 4,
              mr: 2,
              display: 'flex',
              height: 30,
              fontSize: '1rem',
              textTransform: 'capitalize',
              fontWeight: 1000,
              backgroundColor: activeMenu === 'hosting' ? '#602c3b' : 'primary.main',
              zIndex: activeMenu === 'domain' ? '9999' : 'auto',
            }}
            onClick={() => handleDropdownToggle('hosting')}
          >
            <HostingDropdown active={activeMenu === 'hosting'} />
          </Button>
        </MenuItem>
              <MenuItem sx={{ p: 0 }}>
                  <Button
                    size='small'
                    variant='contained'
                    component='a'
                    target='_blank'
                    rel='noreferrer'
                    sx={{
                      p: 4,
                      mr: 2,
                      display: 'flex',
                      height: 30,
                      fontSize: '1rem',
                      textTransform: 'capitalize',
                      fontWeight: 1000,
                      backgroundColor: activeMenu === 'cloud' ? '#602c3b' : 'primary.main',
                    }}
                    onClick={() => handleDropdownToggle('cloud')}
                  >
                 <CloudDropdown active={activeMenu === 'cloud'} />
                </Button>
              </MenuItem>
              <MenuItem sx={{ p: 0 }}>
                <Button
                  size='small'
                  variant='contained'
                  component='a'
                  target='_blank'
                  rel='noreferrer'
                  sx={{
                    p: 4,
                    mr: 2,
                    display: 'flex',
                    height: 30,
                    fontSize: '1rem',
                    textTransform: 'capitalize',
                    fontWeight: 1000,
                    backgroundColor: activeMenu === 'emails' ? '#602c3b' : 'primary.main',
                  }}
                  onClick={() => handleDropdownToggle('emails')}
                
                >
                 <EmailsDropdown  active={activeMenu === 'emails'}/>
                </Button>
              </MenuItem>
              <MenuItem sx={{ p: 0 }}>
                <Button
                  size='small'
                  variant='contained'
                  component='a'
                  target='_blank'
                  rel='noreferrer'
                  sx={{
                    p: 4,
                    mr: 2,
                    display: 'flex',
                    height: 30,
                    fontSize: '1rem',
                    textTransform: 'capitalize',
                    fontWeight: 1000,
                    backgroundColor: activeMenu === 'security' ? '#602c3b' : 'primary.main',
                  }}
                  onClick={() => handleDropdownToggle('security')}
                >
                <SecurityDropdown active={activeMenu === 'security'} />
                </Button>
              </MenuItem>{' '}
              <MenuItem sx={{ p: 0 }}>
                <Button
                 size='small'
                 variant='contained'
                 component='a'
                 target='_blank'
                 rel='noreferrer'
                 sx={{
                   p: 4,
                   mr: 2,
                   display: 'flex',
                   height: 30,
                   fontSize: '1rem',
                   textTransform: 'capitalize',
                   fontWeight: 1000,
                   backgroundColor: activeMenu === 'builder' ? '#602c3b' : 'primary.main',
                 }}
                 onClick={() => handleDropdownToggle('builder')}
                >
                <WebsitesDropdown active={activeMenu === 'builder'} />
                </Button>
              </MenuItem>{' '}
            </Box>{' '}
          </Box>
          
        )}
        
      </Box>

      
      {hidden ? (
  <Box className='actions-right' sx={{ display: 'flex', justifyContent: 'flex-end' }}>
    <ModeToggler settings={settings} saveSettings={saveSettings} />
    {userLoggedIn && <NotificationDropdown />}
    {userLoggedIn && <UserDropdown />}
  </Box>
) : (
  <Box className='actions-left' sx={{ display: 'flex', marginRight: '500px' }}>
    <ModeToggler settings={settings} saveSettings={saveSettings} />
    {userLoggedIn ? (
      <MenuItem>
        <Button
          size='small'
          variant='contained'
          component='a'
          sx={{
            p: 4,
            mr: 2,
            display: 'flex',
            height: 30,
            fontSize: '1rem',
            textTransform: 'capitalize',
            fontWeight: 1000
          }}
          onClick={() => signOut()} // Call the signOut function to log out the user
        >
          LOGOUT
        </Button>
      </MenuItem>
    ) : (
      <>
        <MenuItem>
          <Button
            size='small'
            variant='contained'
            component='a'
            sx={{
              p: 4,
              mr: 2,
              display: 'flex',
              height: 30,
              fontSize: '1rem',
              textTransform: 'capitalize',
              fontWeight: 1000
            }}
            href="/login"
          >
            LOGIN
          </Button>
        </MenuItem>{' '}
        <MenuItem>
          <Button
            size='small'
            variant='contained'
            component='a'
            sx={{
              p: 4,
              mr: 2,
              display: 'flex',
              height: 30,
              fontSize: '1rem',
              textTransform: 'capitalize',
              fontWeight: 1000
            }}
            href="/register"
          >
            REGISTER
          </Button>
        </MenuItem>
      </>
    )}
  </Box>
)}

      
    </Box>
  )
}

export default AppBarContent
