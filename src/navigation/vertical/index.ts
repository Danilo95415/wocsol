// ** Icon imports
import Link from 'mdi-material-ui/Link'
import OfflineShareIcon from '@mui/icons-material/OfflineShare';


import PasswordIcon from '@mui/icons-material/Password';
import TitleIcon from '@mui/icons-material/Title';
import DnsIcon from '@mui/icons-material/Dns';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EnhancedEncryptionIcon from '@mui/icons-material/EnhancedEncryption';
import AttachEmailIcon from '@mui/icons-material/AttachEmail';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import FontDownloadIcon from '@mui/icons-material/FontDownload';
import SafetyCheckIcon from '@mui/icons-material/SafetyCheck';

import CalculateIcon from '@mui/icons-material/Calculate';
import InvertColorsIcon from '@mui/icons-material/InvertColors';
import DifferenceIcon from '@mui/icons-material/Difference';
import LyricsIcon from '@mui/icons-material/Lyrics';
import DataArrayIcon from '@mui/icons-material/DataArray';
import QrCodeIcon from '@mui/icons-material/QrCode';

import CodeIcon from '@mui/icons-material/Code';
import ChromeReaderModeIcon from '@mui/icons-material/ChromeReaderMode';
import DataObjectIcon from '@mui/icons-material/DataObject';

// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'



const navigation = (): VerticalNavItemsType => {
 
  return [ 
   
    {
      sectionTitle: 'Domains'
    },
    {
      title: 'Register A Domain',
      icon: CalculateIcon,
      path: '/register-domain',
    },
    {
      title: 'Transfer A Domain',
      icon: CalculateIcon,
      path: '/transfer-domain',
    },
    {
      sectionTitle: 'Hosting'
    },
    {
      title: 'Shared Web Hosting',
      icon: CalculateIcon,
      path: '/shared-web-hosting',
    },
    
    {
      title: 'Servers',
      icon: CalculateIcon,
      path: '/servers',
    },
    {
      title: 'Reseller Hosting',
      icon: OfflineShareIcon,
      path: '/reseller-hosting',
    },
    
    {
      title: 'Cloud Hosting',
      icon: WhatsAppIcon,
      path: '/cloud-hosting',
    },
    {
      title: 'Tools',
      icon: AttachEmailIcon,
      path: '/hosting-tools',
    },
    {
      sectionTitle: 'Emails'
    },
    {
      title: 'Business Email',
      icon: SafetyCheckIcon,
      path: '/business-email',
    },
    {
      title: 'Enterprise Emails',
      icon: PasswordIcon,
      path: '/password-generator',
    },
    {
      title: 'Google Workspace',
      icon: Link,
      path: '/gsuite',
    },
    
    {
      sectionTitle: 'Security Tools'
    },
    {
      title: 'SSL Certificates',
      icon: EnhancedEncryptionIcon,
      path: '/ssl-certificates',
    },
    
    {
      title: 'SiteLock',
      icon: EnhancedEncryptionIcon,
      path: '/sitelock',
    },
    {
      title: 'Codeguard',
      icon: EnhancedEncryptionIcon,
      path: '/codeguard',
    },
    {
      sectionTitle: 'Website Builder'
    },
    {
      title: 'WOCSOL Website Builder',
      icon: TextSnippetIcon,
      path: '/wocsol-website-builder',
    }
  ]
}



export default navigation
