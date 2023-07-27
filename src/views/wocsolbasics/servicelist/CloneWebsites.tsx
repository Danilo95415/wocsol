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

const CloneWebsites = () => {
  // ** State
  const [collapse, setCollapse] = useState<boolean>(false)

  const handleClick = () => {
    setCollapse(!collapse)
  }

  return (
    <Card>
      <CardMedia sx={{ height: '7.5625rem' }} image='/images/services/copy.png' />
      <CardContent>
        <Typography variant='h6' sx={{ marginBottom: 2 }}>
        Clone Websites
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
          <Typography variant='body2'>
          Most of popular brand websites and apps clone solution is provided within all legal limits , because exact clone of any brand is prohibited under lega...

          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  )
}

export default CloneWebsites
