// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Icons Imports
// ** Custom Components Imports
// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
//my imports
import ContactUs from 'src/views/wocsolbasics/ContactUs'

const Support = () => {
  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
      
        <Grid item xs={12} md={12} sm={12}>
          <h1>WOCSOL Support</h1>        
        </Grid>
        <Grid item xs={12} md={12} sm={12}>
        <ContactUs />     
        </Grid>

      </Grid>
    </ApexChartWrapper>
  )
}

export default Support
