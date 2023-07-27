// ** MUI Imports
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import { Theme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'

const FooterContent = () => {
  // ** Var
  const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
      <Typography sx={{ mr: 2 }}>
        {`© ${new Date().getFullYear()}, Made with `}
        <Box component='span' sx={{ color: 'error.main' }}>
          ❤️
        </Box>
        {` by `}
        <Link href='https://wocsol.com/'>
          WOCSOL
        </Link>
      </Typography>
      {hidden ? null : (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', '& :not(:last-child)': { mr: 4 } }}>
           <Link
            href='/wocsol-about-us'
          >
            About Us
          </Link>
          <Link
            href='/wocsol-contact-us'
          >
            Contact Us
          </Link>
          <Link
            href='/wocsol-refund-policy'
          >
            Refund Policy
          </Link>
          <Link
           
            href='/wocsol-terms-and-conditions'
          >
           Terms & Conditions
          </Link>
          <Link  href='/wocsol-privacy-policy'>
          Privacy Policy
          </Link>
         
          <Link
            href='/wocsol-support'
          >
            Support
          </Link>
        </Box>
      )}
    </Box>
  )
}

export default FooterContent
