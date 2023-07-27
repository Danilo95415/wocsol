import { getSession, status } from 'next-auth/react';

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

import { useRouter } from 'next/router'

import { Icon } from '@iconify/react'

// ** MUI Imports
import Box from '@mui/material/Box'
import { Theme } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import useMediaQuery from '@mui/material/useMediaQuery'
import InputAdornment from '@mui/material/InputAdornment'

import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
// ** Icons Imports
import Menu from 'mdi-material-ui/Menu'
import Magnify from 'mdi-material-ui/Magnify'

// ** Type Import
import { Settings } from 'src/@core/context/settingsContext'

// ** Components
import ModeToggler from 'src/@core/layouts/components/shared-components/ModeToggler'
import UserDropdown from 'src/@core/layouts/components/shared-components/UserDropdown'
import NotificationDropdown from 'src/@core/layouts/components/shared-components/NotificationDropdown'
import Cookie from 'js-cookie'

// custom

import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'

import MenuItem from '@mui/material/MenuItem'

import Chip from '@mui/material/Chip'
import DomainDropdown from 'src/@core/layouts/components/shared-components/DomainDropdown'
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
  px: 2,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  color: 'text.secondary',
  textDecoration: 'none',

  '& svg': {
    fontSize: '0.875rem',
    color: 'text.secondary'
  }
}

const AppBarContent = (props: Props) => {
  // ** Props
  const { hidden, settings, saveSettings, toggleNavVisibility } = props

  // ** Hook
  const hiddenSm = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'))
  
  const [userLoggedIn, setLogged] = useState(false)
  
  useEffect(() => {
    if(Cookie.get('uid_token') !== undefined){
      setLogged(true)
    }
    else{
      setLogged(false)
    }
  })
  // ** States
  const [anchorEl, setAnchorEl] = useState(null)
  const router = useRouter()

  const [activeMenu, setActiveMenu] = useState(null)

  const [isDomainOpen, setDomainOpen] = useState(false)
  const [isHostingOpen, setHostingOpen] = useState(false)
  const [isEmailsOpen, setEmailsOpen] = useState(false)
  const [isSecurityOpen, setSecurityOpen] = useState(false)
  const [isToolsOpen, setToolsOpen] = useState(false)

  const domainRef = useRef(null)
  const hostingRef = useRef(null)
  const emailsRef = useRef(null)
  const securityRef = useRef(null)
  const toolsRef = useRef(null)

  const handleDomainMouseEnter = () => {
    setDomainOpen(true)
    setHostingOpen(false)
    setEmailsOpen(false)
    setSecurityOpen(false)
    setToolsOpen(false)
  }

  const handleHostingMouseEnter = () => {
    setDomainOpen(false)
    setHostingOpen(true)
    setEmailsOpen(false)
    setSecurityOpen(false)
    setToolsOpen(false)
  }

  const handleEmailsMouseEnter = () => {
    setDomainOpen(false)
    setHostingOpen(false)
    setEmailsOpen(true)
    setSecurityOpen(false)
    setToolsOpen(false)
  }

  const handleSecurityMouseEnter = () => {
    setDomainOpen(false)
    setHostingOpen(false)
    setEmailsOpen(false)
    setSecurityOpen(true)
    setToolsOpen(false)
  }

  const handleToolsMouseEnter = () => {
    setDomainOpen(false)
    setHostingOpen(false)
    setEmailsOpen(false)
    setSecurityOpen(false)
    setToolsOpen(true)
  }

  const handleMouseLeave = () => {
    setDomainOpen(false)
    setHostingOpen(false)
    setEmailsOpen(false)
    setSecurityOpen(false)
    setToolsOpen(false)
  }

  const handleDropdownItemClick = link => {
    router.push(link)
  }

  const domainCategories = [
    {
      id: 1,
      name: 'Register Domains',
      items: [
        { id: 1, name: 'Register A Domain', link: '/register-domain', icon: 'clarity:host-solid' },
      ]
    },
    {
      id: 2,
      name: 'Transfer Domains',
      items: [
        { id: 3, name: 'Transfer A Domain', link: '/transfer-domain', icon: 'clarity:host-solid' },
      ]
    },
  ]

  const hostingCategories = [
    {
      id: 1,
      name: 'Shared Hosting',
      items: [
        { id: 1, name: 'Linux SWH', link: '/shared-web-hosting', icon: 'clarity:host-solid' },
        { id: 2, name: 'Windows SWH', link: '/windows-shared-web-hosting', icon: 'clarity:host-solid' },
        { id: 3, name: 'Wordpress Hosting', link: '/wordpress-hosting', icon: 'clarity:host-solid' }
      ]
    },
    {
      id: 2,
      name: 'Servers',
      items: [
        { id: 4, name: 'Linux KVM/VPS', link: '/vps-hosting', icon: 'clarity:host-solid' },
        { id: 5, name: 'Dedicated Servers', link: 'dedicated-servers', icon: 'clarity:host-solid' },
        { id: 6, name: 'Windows DS', link: '/windows-dedicated-servers', icon: 'clarity:host-solid' },
        { id: 7, name: 'Cloud Hosting', link: '/wip', icon: 'clarity:host-solid' }
      ]
    },
    {
      id: 3,
      name: 'Reseller Hosting',
      items: [
        { id: 8, name: 'Linux Reseller Hosting', link: '/wip', icon: 'clarity:host-solid' },
        { id: 9, name: 'Windows Reseller Hosting', link: '/wip', icon: 'clarity:host-solid' }
      ]
    }
  ]

  const emailsCategories = [
    {
      id: 1,
      name: 'Custom Emails',
      items: [
        { id: 1, name: 'Business Emails', link: '/wip', icon: 'clarity:host-solid' },
        { id: 2, name: 'Enterprise Emails', link: '/wip', icon: 'clarity:host-solid' }
      ]
    },
    {
      id: 2,
      name: 'Google Workspace',
      items: [{ id: 3, name: 'Gsuite', link: '/wip', icon: 'clarity:host-solid' }]
    }
  ]

  const securityCategories = [
    {
      id: 1,
      name: 'Security',
      items: [
        { id: 1, name: 'SSL Certificates', link: '/wip', icon: 'clarity:host-solid' },
        { id: 2, name: 'SiteLock', link: '/wip', icon: 'clarity:host-solid' }
      ]
    }
  ]

  const toolsCategories = [
    {
      id: 1,
      name: 'Backup',
      items: [
        { id: 1, name: 'Codeguard Backup', link: '/wip', icon: 'clarity:host-solid' },
        { id: 2, name: 'Acronics Cyber Backup', link: '/wip', icon: 'clarity:host-solid' }
      ]
    },
    {
      id: 2,
      name: 'Site Builder',
      items: [
        { id: 3, name: 'Wocsol Site Builder', link: '/wip', icon: 'clarity:host-solid' },
        { id: 4, name: 'Weebly Site Builder', link: '/wip', icon: 'clarity:host-solid' }
      ]
    }
  ]

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative'
      }}
    >
      <Box className='actions-left' sx={{ mr: 2, display: 'flex', alignItems: 'center', position: 'relative' }}>
        {hidden ? (
          <IconButton
            color='inherit'
            onClick={toggleNavVisibility}
            sx={{ ml: -2.75, ...(hiddenSm ? {} : { mr: 3.5 }) }}
          >
            <Menu />
          </IconButton>
        ) : null}

        {hidden ? (
          <a href='/'>
            {' '}
            <img src='/images/logo.png' width='200px' height='50' />
          </a>
        ) : (
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              position: 'relative'
            }}
          >
            <Box className='actions-right' sx={{ mr: 2, display: 'flex', alignItems: 'center', position: 'relative' }}>
              <a href='/'>
                {' '}
                <img src='/images/logo.png' width='200px' height='50' />
              </a>
            </Box>
            <Box className='actions-right' sx={{ mr: 2, display: 'flex', alignItems: 'center', position: 'relative' }}>
              {/* ------------------ */}
              <MenuItem sx={{ p: 0 }} onMouseEnter={handleDomainMouseEnter} onMouseLeave={handleMouseLeave}>
                <Button
                  size='small'
                  variant='contained'
                  component='a'
                  target='_blank'
                  rel='noreferrer'
                  sx={{
                    p: 6,
                    mr: 2,
                    display: 'flex',
                    height: 30,
                    fontSize: '1rem',
                    textTransform: 'capitalize',
                    fontWeight: 1000,
                    backgroundColor: activeMenu === 'domain' ? '#602c3b' : 'primary.main',
                    zIndex: activeMenu === 'domain' ? '9999' : 'auto'
                  }}
                >
                  Domains
                </Button>

                {isDomainOpen && (
                  <Box
                    ref={domainRef}
                    sx={{
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      pt: 2,
                      pb: 3,
                      px: 4,
                      mr: 4,
                      backgroundColor: '#F7E2EB',
                      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
                      borderRadius: '2%',
                      display: 'flex'
                    }}
                  >
                    {domainCategories.map(category => (
                      <Box key={category.id} sx={{ display: 'flex', flexDirection: 'column', mb: 2, mr: 4 }}>
                        <Typography variant='h6'>{category.name}</Typography>
                        <Divider sx={{ mt: 0, mb: 1 }} />
                        <Box sx={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap' }}>
                          {category.items.map(item => (
                            <MenuItem key={item.id} sx={{ p: 0 }} onClick={() => handleDropdownItemClick(item.link)}>
                              <Icon icon={item.icon} />
                              <Box sx={{ ...styles, overflowWrap: 'break-word' }}>{item.name}</Box>
                            </MenuItem>
                          ))}
                        </Box>
                      </Box>
                    ))}
                  </Box>
                )}
              </MenuItem>
              {/* -------------------- */}
              <MenuItem sx={{ p: 0 }} onMouseEnter={handleHostingMouseEnter} onMouseLeave={handleMouseLeave}>
                <Button
                  size='small'
                  variant='contained'
                  component='a'
                  target='_blank'
                  rel='noreferrer'
                  sx={{
                    p: 6,
                    mr: 2,
                    display: 'flex',
                    height: 30,
                    fontSize: '1rem',
                    textTransform: 'capitalize',
                    fontWeight: 1000,
                    backgroundColor: activeMenu === 'hosting' ? '#602c3b' : 'primary.main',
                    zIndex: activeMenu === 'domain' ? '9999' : 'auto'
                  }}
                >
                  Hosting
                </Button>

                {isHostingOpen && (
                  <Box
                    ref={hostingRef}
                    sx={{
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      pt: 2,
                      pb: 3,
                      px: 4,
                      mr: 4,
                      backgroundColor: '#F7E2EB',
                      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
                      borderRadius: '2%',
                      display: 'flex'
                    }}
                  >
                    {hostingCategories.map(category => (
                      <Box key={category.id} sx={{ display: 'flex', flexDirection: 'column', mb: 2, mr: 4 }}>
                        <Typography variant='h6'>{category.name}</Typography>
                        <Divider sx={{ mt: 0, mb: 1 }} />
                        <Box sx={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap' }}>
                          {category.items.map(item => (
                            <MenuItem key={item.id} sx={{ p: 0 }} onClick={() => handleDropdownItemClick(item.link)}>
                              <Icon icon={item.icon} />
                              <Box sx={{ ...styles, overflowWrap: 'break-word' }}>{item.name}</Box>
                            </MenuItem>
                          ))}
                        </Box>
                      </Box>
                    ))}
                  </Box>
                )}
              </MenuItem>
              <MenuItem sx={{ p: 0 }} onMouseEnter={handleEmailsMouseEnter} onMouseLeave={handleMouseLeave}>
                <Button
                  size='small'
                  variant='contained'
                  component='a'
                  target='_blank'
                  rel='noreferrer'
                  sx={{
                    p: 6,
                    mr: 2,
                    display: 'flex',
                    height: 30,
                    fontSize: '1rem',
                    textTransform: 'capitalize',
                    fontWeight: 1000,
                    backgroundColor: activeMenu === 'emails' ? '#602c3b' : 'primary.main',
                    zIndex: activeMenu === 'emails' ? '9999' : 'auto'
                  }}
                >
                  Emails
                </Button>

                {isEmailsOpen && (
                  <Box
                    ref={emailsRef}
                    sx={{
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      pt: 2,
                      pb: 3,
                      px: 4,
                      mr: 4,
                      backgroundColor: '#F7E2EB',
                      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
                      borderRadius: '2%',
                      display: 'flex'
                    }}
                  >
                    {emailsCategories.map(category => (
                      <Box key={category.id} sx={{ display: 'flex', flexDirection: 'column', mb: 2, mr: 4 }}>
                        <Typography variant='h6'>{category.name}</Typography>
                        <Divider sx={{ mt: 0, mb: 1 }} />
                        <Box sx={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap' }}>
                          {category.items.map(item => (
                            <MenuItem key={item.id} sx={{ p: 0 }} onClick={() => handleDropdownItemClick(item.link)}>
                              <Icon icon={item.icon} />
                              <Box sx={{ ...styles, overflowWrap: 'break-word' }}>{item.name}</Box>
                              <Typography variant='body2'>{category.description}</Typography>
                            </MenuItem>
                          ))}
                        </Box>
                      </Box>
                    ))}
                  </Box>
                )}
              </MenuItem>
              <MenuItem sx={{ p: 0 }} onMouseEnter={handleSecurityMouseEnter} onMouseLeave={handleMouseLeave}>
                <Button
                  size='small'
                  variant='contained'
                  component='a'
                  target='_blank'
                  rel='noreferrer'
                  sx={{
                    p: 6,
                    mr: 2,
                    display: 'flex',
                    height: 30,
                    fontSize: '1rem',
                    textTransform: 'capitalize',
                    fontWeight: 1000,
                    backgroundColor: activeMenu === 'hosting' ? '#602c3b' : 'primary.main',
                    zIndex: activeMenu === 'domain' ? '9999' : 'auto'
                  }}
                >
                  Security
                </Button>

                {isSecurityOpen && (
                  <Box
                    ref={securityRef}
                    sx={{
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      pt: 2,
                      pb: 3,
                      px: 4,
                      mr: 4,
                      backgroundColor: '#F7E2EB',
                      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
                      borderRadius: '2%',
                      display: 'flex'
                    }}
                  >
                    {securityCategories.map(category => (
                      <Box key={category.id} sx={{ display: 'flex', flexDirection: 'column', mb: 2, mr: 4 }}>
                        <Typography variant='h6'>{category.name}</Typography>
                        <Divider sx={{ mt: 0, mb: 1 }} />
                        <Box sx={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap' }}>
                          {category.items.map(item => (
                            <MenuItem key={item.id} sx={{ p: 0 }} onClick={() => handleDropdownItemClick(item.link)}>
                              <Icon icon={item.icon} />
                              <Box sx={{ ...styles, overflowWrap: 'break-word' }}>{item.name}</Box>
                            </MenuItem>
                          ))}
                        </Box>
                      </Box>
                    ))}
                  </Box>
                )}
              </MenuItem>
              <MenuItem sx={{ p: 0 }} onMouseEnter={handleToolsMouseEnter} onMouseLeave={handleMouseLeave}>
                <Button
                  size='small'
                  variant='contained'
                  component='a'
                  target='_blank'
                  rel='noreferrer'
                  sx={{
                    p: 6,
                    mr: 2,
                    display: 'flex',
                    height: 30,
                    fontSize: '1rem',
                    textTransform: 'capitalize',
                    fontWeight: 1000,
                    backgroundColor: activeMenu === 'hosting' ? '#602c3b' : 'primary.main',
                    zIndex: activeMenu === 'domain' ? '9999' : 'auto'
                  }}
                >
                  Tools & Backup
                </Button>

                {isToolsOpen && (
                  <Box
                    ref={toolsRef}
                    sx={{
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      pt: 2,
                      pb: 3,
                      px: 4,
                      mr: 4,
                      backgroundColor: '#F7E2EB',
                      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
                      borderRadius: '2%',
                      display: 'flex'
                    }}
                  >
                    {toolsCategories.map(category => (
                      <Box key={category.id} sx={{ display: 'flex', flexDirection: 'column', mb: 2, mr: 4 }}>
                        <Typography variant='h6'>{category.name}</Typography>
                        <Divider sx={{ mt: 0, mb: 1 }} />
                        <Box sx={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap' }}>
                          {category.items.map(item => (
                            <MenuItem key={item.id} sx={{ p: 0 }} onClick={() => handleDropdownItemClick(item.link)}>
                              <Icon icon={item.icon} />
                              <Box sx={{ ...styles, overflowWrap: 'break-word' }}>{item.name}</Box>
                            </MenuItem>
                          ))}
                        </Box>
                      </Box>
                    ))}
                  </Box>
                )}
              </MenuItem>{' '}
            </Box>{' '}
          </Box>
        )}
      </Box>

      {hidden ? (
        <Box className='actions-right' sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            size='small'
            variant='contained'
            component='a'
            sx={{
              mt: 1,
              mr: 1,
              display: 'flex',
              height: 35,
              fontSize: '1rem',
              textTransform: 'capitalize',
              fontWeight: 1000,
              backgroundColor: '#602c3b'
            }}
            href='/login'
          >
            LOGIN
          </Button>
          <Button
            size='small'
            variant='contained'
            component='a'
            sx={{
              mt: 1,
              mr: 2,
              display: 'flex',
              height: 35,
              fontSize: '1rem',
              textTransform: 'capitalize',
              fontWeight: 1000,
              backgroundColor: '#602c3b'
            }}
            href='/register'
          >
            REGISTER
          </Button>

          <ModeToggler settings={settings} saveSettings={saveSettings} />
          {userLoggedIn ? <UserDropdown /> : null}


        </Box>
      ) : (
        <Box className='actions-right' sx={{ display: 'flex', marginRight: '500px' }}>
          {userLoggedIn ? null : (
            <>
              <Button
                size='small'
                variant='contained'
                component='a'
                sx={{
                  mt: 1,
                  mr: 1,
                  display: 'flex',
                  height: 35,
                  fontSize: '1rem',
                  textTransform: 'capitalize',
                  fontWeight: 1000,
                  backgroundColor: '#602c3b'
                }}
                href='/login'
              >
                LOGIN
              </Button>
              <Button
                size='small'
                variant='contained'
                component='a'
                sx={{
                  mt: 1,
                  mr: 2,
                  display: 'flex',
                  height: 35,
                  fontSize: '1rem',
                  textTransform: 'capitalize',
                  fontWeight: 1000,
                  backgroundColor: '#602c3b'
                }}
                href='/register'
              >
                REGISTER
              </Button>
              <ModeToggler settings={settings} saveSettings={saveSettings} />
            </>
          )}
          <ModeToggler settings={settings} saveSettings={saveSettings} />
          {userLoggedIn ? <UserDropdown /> : null}
        </Box>
      )}
    </Box>
  )
}

export default AppBarContent
