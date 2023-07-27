// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Collapse from '@mui/material/Collapse'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'

// ** Icons Imports
import ChevronUp from 'mdi-material-ui/ChevronUp'
import ChevronDown from 'mdi-material-ui/ChevronDown'

const WebsiteDevelopment = () => {
  // ** State
  const [collapse, setCollapse] = useState<boolean>(false)

  const handleClick = () => {
    setCollapse(!collapse)
  }

  return (
    <Card>
      <CardMedia sx={{ height: '7.5625rem' }} image='/images/services/webdev.png' />
      <CardContent>
        <Typography variant='h6' sx={{ marginBottom: 2 }}>
        Website Development
        </Typography>
      
      </CardContent>
      <CardActions className='card-action-dense'>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Button onClick={handleClick}>Details</Button>
          <IconButton size='small' onClick={handleClick}>
            {collapse ? <ChevronUp sx={{ fontSize: '1.875rem' }} /> : <ChevronDown sx={{ fontSize: '1.875rem' }} />}
          </IconButton>
        </Box>
      </CardActions>
      <Collapse in={collapse}>
        <Divider sx={{ margin: 0 }} />
        <CardContent>
          <Typography variant='body2'>WO offer complete web development solution for static and dynamic websites including core php websites, html & css website designs , UI UX Designs...
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  )
}

export default WebsiteDevelopment
