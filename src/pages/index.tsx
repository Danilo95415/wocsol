// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Icons Imports
// ** Custom Components Imports
// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import StatisticsCard from 'src/views/dashboard/StatisticsCard'

//my imports
import WebTools from 'src/views/wocsolbasics/WebTools'
import WocsolTitle from 'src/views/wocsolbasics/WocsolTitle'
import AboutWocsol from 'src/views/wocsolbasics/AboutWocsol'
import Services from 'src/views/wocsolbasics/Services'
import ContactUs from 'src/views/wocsolbasics/ContactUs'
import DomainSearchForm from 'src/views/services/domain/DomainSearchForm'
import SwhPricing from '../components/SwhPricing';
import { useState, useEffect } from 'react';
import { useAxios } from 'utils/axios'

const home = () => {
  const [products, setProducts] = useState<Array<Object>>([])
  const [axios, spinner] = useAxios()

  useEffect(async () => {
    await axios.get('/api/swh')
      .then(({data}) => {
        setProducts(data)
      })
  }, [])

  return (
    <ApexChartWrapper>
      {spinner}
      <Grid container spacing={6} sx={{mt: 3}}>
        
      <Grid item xs={12} md={12} sm={12}>
        <DomainSearchForm />  
        </Grid>
        <Grid item xs={12} md={12} sm={12}>
        <SwhPricing products={products} />
      </Grid>

       
        <Grid item xs={12}>
        <ContactUs />
        </Grid>
        <Grid item xs={12} md={12} sm={12}>
          <WocsolTitle /> 
          <AboutWocsol />        
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default home
