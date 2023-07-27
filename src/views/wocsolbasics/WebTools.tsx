import { useState, useEffect } from 'react'
import { Card, CardContent, Grid, Link, Typography } from '@mui/material'
import { FC } from 'react'
import { useRouter } from 'next/router'

import PasswordIcon from '@mui/icons-material/Password'
import TitleIcon from '@mui/icons-material/Title'
import DnsIcon from '@mui/icons-material/Dns'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import EnhancedEncryptionIcon from '@mui/icons-material/EnhancedEncryption'
import AttachEmailIcon from '@mui/icons-material/AttachEmail'
import TextSnippetIcon from '@mui/icons-material/TextSnippet'
import FontDownloadIcon from '@mui/icons-material/FontDownload'
import SafetyCheckIcon from '@mui/icons-material/SafetyCheck'

import CalculateIcon from '@mui/icons-material/Calculate'
import InvertColorsIcon from '@mui/icons-material/InvertColors'
import DifferenceIcon from '@mui/icons-material/Difference'
import LyricsIcon from '@mui/icons-material/Lyrics'
import DataArrayIcon from '@mui/icons-material/DataArray'
import QrCodeIcon from '@mui/icons-material/QrCode'

import CodeIcon from '@mui/icons-material/Code'
import ChromeReaderModeIcon from '@mui/icons-material/ChromeReaderMode'
import DataObjectIcon from '@mui/icons-material/DataObject'

import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions'

import OfflineShareIcon from '@mui/icons-material/OfflineShare'
import DatasetLinkedIcon from '@mui/icons-material/DatasetLinked'

interface IconProps {
  title: string
  path: string
  icon: JSX.Element
}


function handleToolClick(path: string, router: NextRouter) {
  router.push(path)
}


const Icons: FC = () => {
  const router = useRouter()

  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false)

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const [category, setCategory] = useState<
    'common' | 'hosting' | 'calculators' | 'converters' | 'generators' | 'coding' | 'links' | 'text'
  >('hosting')
  const iconStyles = { fontSize: 50, color: '#A22E50' }


  const activeStyle = { fontSize: 30, color: 'pink', fontWeight: 'bold', backgroundColor: '#a22e50', padding: '10px' }
  const inactiveStyle = {
    fontSize: 20,
    fontWeight: 'normal',
    backgroundColor: '#F990B9',
    color: 'black',
    padding: '5px'
  }

  const getIconsForCategory = (): IconProps[] => {
    if (category === 'common') {
      return commonTools
    } else if (category === 'hosting') {
      return hostingTools
    } else if (category === 'calculators') {
      return calculators
    } else if (category === 'converters') {
      return converters
    } else if (category === 'generators') {
      return generators
    } else if (category === 'coding') {
      return codingTools
    } else if (category === 'links') {
      return linkTools
    } else if (category === 'text') {
      return textTools
    }
    return []
  }

  const commonTools: IconProps[] = [
    {
      title: 'Duplicate Lines Remover',
      path: '/duplicate-lines-remover',
      icon: <DifferenceIcon sx={{ ...iconStyles }} />
    },
    {
      title: 'Text to Speech',
      path: '/text-to-speech',
      icon: <LyricsIcon sx={{ ...iconStyles }} />
    },
    {
      title: 'QR Code Reader',
      path: '/qr-code-reader',
      icon: <QrCodeIcon sx={{ ...iconStyles }} />
    }
  ]

  const calculators: IconProps[] = [
    {
      title: 'Advanced Calculator',
      icon: <CalculateIcon sx={{ ...iconStyles }} />,
      path: '/advanced-calculator'
    },
    {
      title: 'Investment Value Calculator',
      icon: <CalculateIcon sx={{ ...iconStyles }} />,
      path: '/investment-calculator'
    },
    {
      title: 'Loan EMI Calculator',
      icon: <CalculateIcon sx={{ ...iconStyles }} />,
      path: '/loan-emi-calculator'
    },

    {
      title: 'Character Counter',
      icon: <CalculateIcon sx={{ ...iconStyles }} />,
      path: '/character-counter'
    }
  ]

  const linkTools: IconProps[] = [
    {
      title: 'Multiple URL Opener',
      icon: <OfflineShareIcon sx={{ ...iconStyles }} />,
      path: '/multiple-url-opener'
    },

    {
      title: 'Whatsapp Share Link',
      icon: <WhatsAppIcon sx={{ ...iconStyles }} />,
      path: '/whatsapp-share-link-generator'
    },
    {
      title: 'Mailto Link Creator',
      icon: <AttachEmailIcon sx={{ ...iconStyles }} />,
      path: '/mailto-link-generator'
    },
    {
      title: 'Safe URL Checker',
      icon: <SafetyCheckIcon sx={{ ...iconStyles }} />,
      path: '/safe-url-checker'
    }
  ]

  const generators: IconProps[] = [
    {
      title: 'Sitemap Generator',
      icon: <DatasetLinkedIcon sx={{ ...iconStyles }} />,
      path: '/unlimited-sitemap-generator/'
    },
    {
      title: 'Password Generator',
      icon: <PasswordIcon sx={{ ...iconStyles }} />,
      path: '/password-generator'
    },
    {
      title: 'Slug Generator',
      icon: <TitleIcon sx={{ ...iconStyles }} />,
      path: '/slug-generator'
    },
    {
      title: 'MD5 Generator',
      icon: <EnhancedEncryptionIcon sx={{ ...iconStyles }} />,
      path: '/md5-generator'
    },

    {
      title: 'UUID V4 Generator',
      icon: <EnhancedEncryptionIcon sx={{ ...iconStyles }} />,
      path: '/uuid-v4-generator'
    },
    {
      title: 'Bcrypt Generator',
      icon: <EnhancedEncryptionIcon sx={{ ...iconStyles }} />,
      path: '/bcrypt-generator'
    },

    {
      title: 'Lorem Ipsum Generator',
      icon: <TextSnippetIcon sx={{ ...iconStyles }} />,
      path: '/lorem-ipsum-generator'
    }
  ]

  const hostingTools: IconProps[] = [
    {
      title: 'Domain IP Finder',
      icon: <DnsIcon sx={{ ...iconStyles }} />,
      path: '/domain-ip-finder'
    },
    {
      title: 'DNS Lookup',
      icon: <DnsIcon sx={{ ...iconStyles }} />,
      path: '/dns-lookup'
    },

    {
      title: 'Whois Lookup',
      icon: <DnsIcon sx={{ ...iconStyles }} />,
      path: '/whois-lookup'
    },
    {
      title: 'URL Parser',
      icon: <DatasetLinkedIcon sx={{ ...iconStyles }} />,
      path: '/url-parser'
    },
    {
      title: 'HTTP Headers Lookup',
      icon: <EnhancedEncryptionIcon sx={{ ...iconStyles }} />,
      path: '/http-headers-lookup'
    },
    {
      title: 'Meta Tags Checker',
      icon: <CodeIcon sx={{ ...iconStyles }} />,
      path: '/meta-tags-checker'
    }
  ]

  const converters: IconProps[] = [
    {
      title: 'Case Converter',
      icon: <FontDownloadIcon sx={{ ...iconStyles }} />,
      path: '/uppercase-lowercase'
    },
    {
      title: 'Base64 Converter',
      icon: <EnhancedEncryptionIcon sx={{ ...iconStyles }} />,
      path: '/base64-converter'
    },
    {
      title: 'Base64 Image Converter',
      icon: <EnhancedEncryptionIcon sx={{ ...iconStyles }} />,
      path: '/base64-image-converter'
    },
    {
      title: 'IDN Punycode Converter',
      icon: <EnhancedEncryptionIcon sx={{ ...iconStyles }} />,
      path: '/idn-punycode-converter'
    },
    {
      title: 'Color Converter',
      icon: <InvertColorsIcon sx={{ ...iconStyles }} />,
      path: '/color-converter'
    }, 
    {
      title: 'Length Converter',
      icon: <InvertColorsIcon sx={{ ...iconStyles }} />,
      path: '/length-converter'
    },
    {
      title: 'Area Converter',
      icon: <InvertColorsIcon sx={{ ...iconStyles }} />,
      path: '/-converter'
    },
    {
      title: 'Mass Converter',
      icon: <InvertColorsIcon sx={{ ...iconStyles }} />,
      path: '/mass-converter'
    },
    {
      title: 'Volume Converter',
      icon: <InvertColorsIcon sx={{ ...iconStyles }} />,
      path: '/volume-converter'
    },
    {
      title: 'Each Converter',
      icon: <InvertColorsIcon sx={{ ...iconStyles }} />,
      path: '/each-converter'
    },
    {
      title: 'Temperature Converter',
      icon: <InvertColorsIcon sx={{ ...iconStyles }} />,
      path: '/temperature-converter'
    },
    {
      title: 'Time Converter',
      icon: <InvertColorsIcon sx={{ ...iconStyles }} />,
      path: '/time-converter'
    },
    {
      title: 'Digital Converter',
      icon: <InvertColorsIcon sx={{ ...iconStyles }} />,
      path: '/digital-converter'
    },
    {
      title: 'PartsPer Converter',
      icon: <InvertColorsIcon sx={{ ...iconStyles }} />,
      path: '/partsper-converter'
    },
    {
      title: 'Speed Converter',
      icon: <InvertColorsIcon sx={{ ...iconStyles }} />,
      path: '/speed-converter'
    },
    {
      title: 'Pace Converter',
      icon: <InvertColorsIcon sx={{ ...iconStyles }} />,
      path: '/pace-converter'
    },
    {
      title: 'Pressure Converter',
      icon: <InvertColorsIcon sx={{ ...iconStyles }} />,
      path: '/pressure-converter'
    },
    {
      title: 'Current Converter',
      icon: <InvertColorsIcon sx={{ ...iconStyles }} />,
      path: '/current-converter'
    },
    {
      title: 'Voltage Converter',
      icon: <InvertColorsIcon sx={{ ...iconStyles }} />,
      path: '/voltage-converter'
    },
    {
      title: 'Power Converter',
      icon: <InvertColorsIcon sx={{ ...iconStyles }} />,
      path: '/power-converter'
    },
    {
      title: 'ReactivePower Converter',
      icon: <InvertColorsIcon sx={{ ...iconStyles }} />,
      path: '/reactive-power-converter'
    },
    {
      title: 'Apparent Power Converter',
      icon: <InvertColorsIcon sx={{ ...iconStyles }} />,
      path: '/apparentpower-converter'
    },
    {
      title: 'Energy Converter',
      icon: <InvertColorsIcon sx={{ ...iconStyles }} />,
      path: '/energy-converter'
    },
    {
      title: 'Reactive Energy Converter',
      icon: <InvertColorsIcon sx={{ ...iconStyles }} />,
      path: '/reactive-energy-converter'
    },
    {
      title: 'Volume Flow Rate Converter',
      icon: <InvertColorsIcon sx={{ ...iconStyles }} />,
      path: '/volume-flow-rate-converter'
    },
    {
      title: 'Illuminance Converter',
      icon: <InvertColorsIcon sx={{ ...iconStyles }} />,
      path: '/illuminance-converter'
    },
    {
      title: 'Frequency Converter',
      icon: <InvertColorsIcon sx={{ ...iconStyles }} />,
      path: '/frequency-converter'
    },
    {
      title: 'Angle Converter',
      icon: <InvertColorsIcon sx={{ ...iconStyles }} />,
      path: '/angle-converter'
    }
  ]

  const codingTools: IconProps[] = [
   

  ]


  const textTools: IconProps[] = [
    {
      title: 'Text Lower Case',
      icon: <EnhancedEncryptionIcon sx={{ ...iconStyles }} />,
      path: '/text-lower-case'
    },
    {
      title: 'Text Upper Case',
      icon: <EnhancedEncryptionIcon sx={{ ...iconStyles }} />,
      path: '/text-upper-case'
    },
    {
      title: 'Text Title Case',
      icon: <EnhancedEncryptionIcon sx={{ ...iconStyles }} />,
      path: '/text-title-case'
    },
    {
      title: 'Text Inverse',
      icon: <EnhancedEncryptionIcon sx={{ ...iconStyles }} />,
      path: '/text-inverse'
    },
    {
      title: 'Text Capitalize',
      icon: <EnhancedEncryptionIcon sx={{ ...iconStyles }} />,
      path: '/text-capitalize'
    },
    {
      title: 'Text Reverse',
      icon: <EnhancedEncryptionIcon sx={{ ...iconStyles }} />,
      path: '/text-reverse'
    },
    {
      title: 'Spaces to Tabs',
      icon: <EnhancedEncryptionIcon sx={{ ...iconStyles }} />,
      path: '/spaces-to-tabs'
    },
    {
      title: 'Tabs to Spaces',
      icon: <EnhancedEncryptionIcon sx={{ ...iconStyles }} />,
      path: '/tabs-to-spaces'
    },
    {
      title: 'Spaces To Newlines',
      icon: <EnhancedEncryptionIcon sx={{ ...iconStyles }} />,
      path: '/spaces-to-newlines'
    },
    {
      title: 'Newlines To Spaces',
      icon: <EnhancedEncryptionIcon sx={{ ...iconStyles }} />,
      path: '/newlines-to-spaces'
    },
    {
      title: 'Remove Letter Accents',
      icon: <EnhancedEncryptionIcon sx={{ ...iconStyles }} />,
      path: '/remove-letter-accents'
    },
    {
      title: 'Remove Extra Whitespace',
      icon: <EnhancedEncryptionIcon sx={{ ...iconStyles }} />,
      path: '/remove-extra-whitespace'
    },
    {
      title: 'Remove All Whitespace',
      icon: <EnhancedEncryptionIcon sx={{ ...iconStyles }} />,
      path: '/remove-all-whitespace'
    },
    {
      title: 'Extract Emails',
      icon: <EnhancedEncryptionIcon sx={{ ...iconStyles }} />,
      path: '/extract-emails'
    },
    {
      title: 'Extract URLs',
      icon: <EnhancedEncryptionIcon sx={{ ...iconStyles }} />,
      path: '/extract-urls'
    },
    {
      title: 'Extract Numbers',
      icon: <EnhancedEncryptionIcon sx={{ ...iconStyles }} />,
      path: '/extract-numbers'
    },
    {
      title: 'Text To Morse',
      icon: <EnhancedEncryptionIcon sx={{ ...iconStyles }} />,
      path: '/text-to-morse'
    },
    {
      title: 'Morse To Text',
      icon: <EnhancedEncryptionIcon sx={{ ...iconStyles }} />,
      path: '/morse-to-text'
    },
    {
      title: 'Count Character Frequency',
      icon: <EnhancedEncryptionIcon sx={{ ...iconStyles }} />,
      path: '/count-character-frequency'
    },
    {
      title: 'Count Word Frequency',
      icon: <EnhancedEncryptionIcon sx={{ ...iconStyles }} />,
      path: '/count-word-frequency'
    },
    {
      title: 'Split Text',
      icon: <EnhancedEncryptionIcon sx={{ ...iconStyles }} />,
      path: '/split-text'
    },
    {
      title: 'Delete Duplicate Lines',
      icon: <EnhancedEncryptionIcon sx={{ ...iconStyles }} />,
      path: '/delete-duplicate-lines'
    },
    {
      title: 'Text Replace',
      icon: <EnhancedEncryptionIcon sx={{ ...iconStyles }} />,
      path: '/text-replace'
    },
    {
      title: 'Remove Empty Lines',
      icon: <EnhancedEncryptionIcon sx={{ ...iconStyles }} />,
      path: '/remove-empty-lines'
    }
   
  ]

  const renderIconGrids = () => {
    const icons = getIconsForCategory()

    return icons.map(({ title, path, icon }) => {
      return (
        <Grid
          item
          key={title}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: '#A22E50',
            padding: '20px'
          }}
        >
         <Link href={path} passhref>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                '&:hover': { transform: 'translateY(-5px)' }
              }}
              onClick={e => {
                e.preventDefault()
                handleToolClick(path, router)
              }}
            >
              <CardContent>{icon}</CardContent>
              <Typography
                variant='subtitle2'
                sx={{
                  paddingLeft: '10px',
                  paddingRight: '10px',
                  textAlign: 'center',
                  height: '30px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}
              >
                {title}
              </Typography>
            </Card>
          </Link>
        </Grid>
      )
    })
  }

  return (
    <Grid container spacing={6} justifyContent='center' style={{ display: isSmallScreen ? 'none' : 'flex' }}>
      <Grid item xs={12} sx={{ textAlign: 'center', mt: '20px' }}>
        <Typography variant='h4'>
          <Link>WOCSOL Web Tools</Link>
        </Typography>
      </Grid>
      <Grid item xs={12} sx={{ textAlign: 'center' }}>
        <Typography variant='h6'>Select a category</Typography>
      </Grid>
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', mb: '0px' }}>
        <Card>
          <Link
            href='#'
            onClick={() => setCategory('common')}
            sx={{ ...inactiveStyle, ...(category === 'common' && activeStyle), mr: '10px' }}
          >
            Common Tools
          </Link>
          <Link
            href='#'
            onClick={() => setCategory('hosting')}
            sx={{ ...inactiveStyle, ...(category === 'hosting' && activeStyle), mr: '10px' }}
          >
            Hosting Tools
          </Link>
          <Link
            href='#'
            onClick={() => setCategory('links')}
            sx={{ ...inactiveStyle, ...(category === 'links' && activeStyle), mr: '10px' }}
          >
            Link Tools
          </Link>
          <Link
            href='#'
            onClick={() => setCategory('coding')}
            sx={{ ...inactiveStyle, ...(category === 'coding' && activeStyle), mr: '10px' }}
          >
            Coding Tools
          </Link>
          <Link
            href='#'
            onClick={() => setCategory('generators')}
            sx={{ ...inactiveStyle, ...(category === 'generators' && activeStyle), mr: '10px' }}
          >
            Generators
          </Link>
          <Link
            href='#'
            onClick={() => setCategory('converters')}
            sx={{ ...inactiveStyle, ...(category === 'converters' && activeStyle), mr: '10px' }}
          >
            Converters
          </Link>

          <Link
            href='#'
            onClick={() => setCategory('calculators')}
            sx={{ ...inactiveStyle, ...(category === 'calculators' && activeStyle), mr: '10px' }}
          >
            Calculators
          </Link>
          <Link
            href='#'
            onClick={() => setCategory('text')}
            sx={{ ...inactiveStyle, ...(category === 'text' && activeStyle), mr: '0px' }}
          >
            Text Tools
          </Link>
        </Card>
      </Grid>
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', mb: '0px' }}>
        <Card>
          
          {/* <Link
            href='#'
            onClick={() => setCategory('new2')}
            sx={{ ...inactiveStyle, ...(category === 'new2' && activeStyle), mr: '10px' }}
          >
            new2 Tools
          </Link>
          <Link
            href='#'
            onClick={() => setCategory('new3')}
            sx={{ ...inactiveStyle, ...(category === 'new3' && activeStyle), mr: '10px' }}
          >
            new3 Tools
          </Link>
          <Link
            href='#'
            onClick={() => setCategory('new4')}
            sx={{ ...inactiveStyle, ...(category === 'new4' && activeStyle), mr: '10px' }}
          >
            new4 Tools
          </Link> */}
          
        </Card>
      </Grid>
      {renderIconGrids()}
    </Grid>
  )
}

export default Icons
