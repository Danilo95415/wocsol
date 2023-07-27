// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Icons Imports
// ** Custom Components Imports
// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
//my imports
import ContactUs from 'src/views/wocsolbasics/ContactUs'

const ContactUS = () => {
  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
      
        <Grid item xs={12} md={12} sm={12}>
          <h1>WOCSOL Contact US</h1>        
        </Grid>
        <Grid item xs={12} md={12} sm={12}>
          <p>General Enquiry : info@wocsol.com</p>
          <p>Support Email :  Support@wocsol.com</p>
          <p>Contact Number : +1 231 999 1212 (Whatsapp Only)</p>
        <ContactUs />     
        </Grid>

      </Grid>
    </ApexChartWrapper>
  )
}

export default ContactUS
