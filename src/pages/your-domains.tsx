// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Icons Imports
import Poll from 'mdi-material-ui/Poll'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import HelpCircleOutline from 'mdi-material-ui/HelpCircleOutline'
import BriefcaseVariantOutline from 'mdi-material-ui/BriefcaseVariantOutline'
import InvoiceTable from 'src/views/dashboard/InvoiceTable'

// ** Custom Components Imports
import CardStatisticsVerticalComponent from 'src/@core/components/card-statistics/card-stats-vertical'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import Table from 'src/views/dashboard/Table'
import Trophy from 'src/views/dashboard/Trophy'
import TotalEarning from 'src/views/dashboard/TotalEarning'
import StatisticsCard from 'src/views/dashboard/StatisticsCard'
import WeeklyOverview from 'src/views/dashboard/WeeklyOverview'
import DepositWithdraw from 'src/views/dashboard/DepositWithdraw'
import SalesByCountries from 'src/views/dashboard/SalesByCountries'
import { useAxios } from 'utils/axios'
import { Typography } from '@mui/material'


export async function getServerSideProps(context){
  const { req } = context
  const uid = req.cookies.uid_token

  try{
    const uid_token = +atob(uid).split(" ")[1].substring(10,)

    const response = await fetch('https://secure.webhosting.live/api/admin/order/get_list', {
        method: 'POST',
        headers: {
          'Authorization': 'Basic YWRtaW46bGNsY0dselRlbWNkdWM5ODhtd2d3MmJXd2p3czhTemM=',
          'Content-Type': 'application/json',
        }
    })
    const data = await response.json()

    // console.log(final_invoice)
    const listing = data.result.list
    let final = [];
    let active_service:number = 0
    let services:number = 0
    listing.forEach(ele => {
      let row = {}
      if(ele.client.id === uid_token && ele.service_type === 'domain'){
        row.title = ele.title
        row.period = ele.period
        row.price = ele.price
        row.status = ele.status
        final.push(row)
        services += 1
        if(ele.status === 'active') active_service += 1
      }
    })

    console.log(final)

    return {
      props: { 
        services: final,
        client_id: uid_token
      }
    }

  }
  catch(err){
    console.log(err)
    return {
      redirect: {
        permanent: false,
        destination: '/login'
      }
    }
  }
}

const Dashboard = ({ services, client_id }) => {
  return (
    <ApexChartWrapper>
      <Grid container spacing={6} mt={2}>
        <Grid item xs={12} >
          <Typography variant="h4">Your Domains</Typography>
          <Table rows={services} client_id={client_id}/>
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default Dashboard
