// ** React Imports

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'

//my imports
import ServiceProviders from 'src/views/wocsolbasics/scopes/ServiceProviders'
import AccountantFinancials from 'src/views/wocsolbasics/scopes/AccountantFinancials'
import BettingSoftwares from 'src/views/wocsolbasics/scopes/BettingSoftwares'
import CloneWebsites from 'src/views/wocsolbasics/scopes/CloneWebsites'
import CustomProjects from 'src/views/wocsolbasics/scopes/CustomProjects'
import GovtSectors from 'src/views/wocsolbasics/scopes/GovtSectors'
import HealthCare from 'src/views/wocsolbasics/scopes/HealthCare'
import Hotels from 'src/views/wocsolbasics/scopes/Hotels'
import Mlm from 'src/views/wocsolbasics/scopes/Mlm'
import PaymentGateway from 'src/views/wocsolbasics/scopes/PaymentGateway'
import ProfessionalConsultants from 'src/views/wocsolbasics/scopes/ProfessionalConsultants'
import RealEstate from 'src/views/wocsolbasics/scopes/RealEstate'
import Schools from 'src/views/wocsolbasics/scopes/Schools'
import TaxiBookingServices from 'src/views/wocsolbasics/scopes/TaxiBookingServices'
import Transportation from 'src/views/wocsolbasics/scopes/Transportation'
import VentureConcepts from 'src/views/wocsolbasics/scopes/VentureConcepts'


const Scope = () => {
  return (



  

    <Card>
      <CardHeader
        title={<h3>Wocsol Scope of Services</h3>}
        subheader={
          <Typography variant='body2'>
            <Box component='span' sx={{ fontWeight: 600, color: 'text.primary' }}>
             All Sector for which services offered by wocsol
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
             <ServiceProviders />
         </Grid>
         <Grid item xs={12} sm={6} md={2}>
             <Hotels />
         </Grid>
         <Grid item xs={12} sm={6} md={2}>
             <Schools />
         </Grid>
         <Grid item xs={12} sm={6} md={2}>
             <ProfessionalConsultants />
         </Grid>
         <Grid item xs={12} sm={6} md={2}>
             <Transportation />
         </Grid>
         <Grid item xs={12} sm={6} md={2}>
             <TaxiBookingServices />
         </Grid>
         <Grid item xs={12} sm={6} md={2}>
             <AccountantFinancials />
         </Grid>
         <Grid item xs={12} sm={6} md={2}>
             <HealthCare />
         </Grid>
         <Grid item xs={12} sm={6} md={2}>
             <RealEstate />
         </Grid>
         <Grid item xs={12} sm={6} md={2}>
             <VentureConcepts />
         </Grid>
         <Grid item xs={12} sm={6} md={2}>
             <GovtSectors />
         </Grid>
         <Grid item xs={12} sm={6} md={2}>
             <BettingSoftwares />
         </Grid>
         <Grid item xs={12} sm={6} md={2}>
             <Mlm />
         </Grid>
         <Grid item xs={12} sm={6} md={2}>
             <CustomProjects />
         </Grid>
         <Grid item xs={12} sm={6} md={2}>
             <CloneWebsites />
         </Grid>
         <Grid item xs={12} sm={6} md={2}>
             <PaymentGateway />
         </Grid>
    </Grid>

    </Card>
  )
}

export default Scope
