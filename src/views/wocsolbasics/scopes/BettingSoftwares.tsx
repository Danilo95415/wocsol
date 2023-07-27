// ** MUI Imports
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

const BettingSoftwares = () => {
  return (
    <Card>
      <CardMedia sx={{ height: '7.5625rem' }} image='/images/scopes/services.svg' />
      <CardContent>
        <Typography variant='h6' sx={{ marginBottom: 2 }}>
        Betting Softwares
        </Typography>
        {/* <Typography variant='body2'>
          Cancun is back, better than ever! Over a hundred Mexico resorts have reopened and the state tourism minister
          predicts Cancun will draw as many visitors in 2006 as it did two years ago.
        </Typography> */}
      </CardContent>
    </Card>
  )
}

export default BettingSoftwares
