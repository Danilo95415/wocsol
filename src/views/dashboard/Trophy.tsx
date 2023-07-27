// ** MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { styled, useTheme } from '@mui/material/styles'
import { useRouter } from 'next/router'

// Styled component for the triangle shaped background image
const TriangleImg = styled('img')({
  right: 0,
  bottom: 0,
  height: 170,
  position: 'absolute'
})

// Styled component for the trophy image
const TrophyImg = styled('img')({
  right: 36,
  bottom: 20,
  height: 98,
  position: 'absolute'
})

const Trophy = ({ info }) => {
  // ** Hook
  const theme = useTheme()

  const router = useRouter()

  const imageSrc = theme.palette.mode === 'light' ? 'triangle-light.png' : 'triangle-dark.png'

  return (
    <Card sx={{ position: 'relative' }}>
      <CardContent>
        <Typography variant='h6' sx={{ mb: 4}}>Welcome back {info.name}!</Typography>
        <Typography variant='body2' sx={{ letterSpacing: '0.25px', mb: 2 }}>
          {info.email}
        </Typography>
        <Typography variant='body2' sx={{ letterSpacing: '0.25px', mb: 4 }}>
          {info.phone}
        </Typography>
        <Button size='small' variant='contained' onClick={() => {router.push('/account-settings')}} sx={{mb:1}}>
          Edit Profile
        </Button>
        <TriangleImg alt='triangle background' src={`/images/misc/${imageSrc}`} />
        <TrophyImg alt='trophy' src='/images/misc/trophy.png' />
      </CardContent>
    </Card>
  )
}

export default Trophy
