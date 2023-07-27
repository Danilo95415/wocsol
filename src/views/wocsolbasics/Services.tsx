
// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'

//my imports
import WebsiteDevelopment from 'src/views/wocsolbasics/servicelist/WebsiteDevelopment'
import BulkSMSServices from 'src/views/wocsolbasics/servicelist/BulkSMSServices'
import WebHosting from 'src/views/wocsolbasics/servicelist/WebHosting'
import TradingPlatforms from 'src/views/wocsolbasics/servicelist/TradingPlatforms'
import SocialMediaMarketing from 'src/views/wocsolbasics/servicelist/SocialMediaMarketing'
import SearchEngineOptimization from 'src/views/wocsolbasics/servicelist/SearchEngineOptimization'
import MobileAppDevelopment from 'src/views/wocsolbasics/servicelist/MobileAppDevelopment'
import GameDevelopmentServices from 'src/views/wocsolbasics/servicelist/GameDevelopmentServices'
import DomainRegistration from 'src/views/wocsolbasics/servicelist/DomainRegistration'
import CloneWebsites from 'src/views/wocsolbasics/servicelist/CloneWebsites'


const Services = () => {
  return ( 

    <Card>
      <CardHeader
        title={<h3>Wocsol Services</h3>}
        subheader={
          <Typography variant='body2'>
            <Box component='span' sx={{ fontWeight: 600, color: 'text.primary' }}>
             All services offered by wocsol
            </Box>
          </Typography>
        }
        titleTypographyProps={{
          sx: {
            mb: 2.5,
            lineHeight: '2rem !important',
            letterSpacing: '0.15px !important'
          }
        }}
      />
       <Grid container spacing={6}  sx={{ pl : 2 , pr : 2 }}>
         <Grid item xs={12} sm={6} md={2}>
             <WebsiteDevelopment />
         </Grid>
         <Grid item xs={12} sm={6} md={2}>
             <MobileAppDevelopment />
         </Grid>
         <Grid item xs={12} sm={6} md={2}>
             <SearchEngineOptimization />
         </Grid>
         <Grid item xs={12} sm={6} md={2}>
             <WebHosting />
         </Grid>
         <Grid item xs={12} sm={6} md={2}>
             <DomainRegistration />
         </Grid>
         <Grid item xs={12} sm={6} md={2}>
             <SocialMediaMarketing />
         </Grid>
         <Grid item xs={12} sm={6} md={2}>
             <GameDevelopmentServices />
         </Grid>
         <Grid item xs={12} sm={6} md={2}>
             <BulkSMSServices />
         </Grid>
         <Grid item xs={12} sm={6} md={2}>
             <CloneWebsites />
         </Grid>
         <Grid item xs={12} sm={6} md={2}>
             <TradingPlatforms />
         </Grid>
    </Grid>

    </Card>
  )
}

export default Services
