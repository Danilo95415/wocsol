// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Icons Imports
import Poll from 'mdi-material-ui/Poll'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import HelpCircleOutline from 'mdi-material-ui/HelpCircleOutline'
import BriefcaseVariantOutline from 'mdi-material-ui/BriefcaseVariantOutline'
import InvoiceTable from 'src/views/dashboard/InvoiceTable'
import axios from 'axios'
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
import { Element } from 'cheerio'

const getServer = async (id) => {
  const server = await fetch('https://secure.webhosting.live/api/admin/order/service', {
              method: 'POST',
              headers: {
              'Authorization': 'Basic YWRtaW46bGNsY0dselRlbWNkdWM5ODhtd2d3MmJXd2p3czhTemM=',
              'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  id: +id
              })
          })

  const dat = await server.json()
  return dat.result
}

const getCurrency = async (client_id:number) => {
  const response = await fetch('https://secure.webhosting.live/api/admin/client/get', {
        method: 'POST',
        headers: {
          'Authorization': 'Basic YWRtaW46bGNsY0dselRlbWNkdWM5ODhtd2d3MmJXd2p3czhTemM=',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: client_id
        })
    })

  const currency = await response.json()
  return currency.result.currency;
}

const convert = async (amount : number, currency: string) => {
  const server = await fetch('https://secure.webhosting.live/api/guest/currency/format', {
              method: 'POST',
              headers: {
              'Authorization': 'Basic YWRtaW46bGNsY0dselRlbWNkdWM5ODhtd2d3MmJXd2p3czhTemM=',
              'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  price: amount, 
                  code: currency
              })
          })

  const dat = await server.json()
  return dat.result
}

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

    const client = await fetch('https://secure.webhosting.live/api/admin/client/get', {
        method: 'POST',
        headers: {
          'Authorization': 'Basic YWRtaW46bGNsY0dselRlbWNkdWM5ODhtd2d3MmJXd2p3czhTemM=',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: uid_token
        })
    })

    const client_data = await client.json()

    const user_data = {
      name: client_data.result.first_name + " " + client_data.result.last_name,
      email: client_data.result.email,
      phone: client_data.result.phone
    }

    const invoice = await fetch('https://secure.webhosting.live/api/admin/invoice/get_list', {
      method: 'POST',
      headers: {
        'Authorization': 'Basic YWRtaW46bGNsY0dselRlbWNkdWM5ODhtd2d3MmJXd2p3czhTemM=',
        'Content-Type': 'application/json',
      }
    })

    const invoice_data = await invoice.json();

    const currency:string = await getCurrency(uid_token)
    let final_invoice = [];
    let paid_invoice:number = 0
    let invoices:number = 0;

    for(let ele of invoice_data.result.list){
        let row = {}
        if(ele.client.id === uid_token){
          // console.log(ele)
          row.title = ele.lines[0].title
          row.period = ele.lines[0].period
          row.price = ele.currency === currency ? currency + " " + ele.lines[0].price : await convert(+ele.lines[0].price, currency)
          row.status = ele.status
          row.serie_nr = ele.serie_nr
          row.created_at = ele.created_at
          row.due_at = ele.due_at
          row.paid_at = ele.paid_at
          row.company = ele.seller.company
          row.company_address = ele.seller.address
          row.phone_company = ele.seller.phone
          row.email = ele.seller.email
          row.name = ele.buyer.first_name + " " + ele.buyer.last_name
          row.company_profile = ele.buyer.company
          row.phone = ele.buyer.phone
          row.lines = ele.lines
          final_invoice.push(row)
          invoices += 1
          if(ele.status === 'paid') paid_invoice += 1
        }
    }

    // console.log(final_invoice)
    const listing = data.result.list
    let final = [];
    let active_service:number = 0
    let services:number = 0;
    for(let ele of listing){
      let row = {}
      if(ele.client.id === uid_token){
        row.id = ele.id
        row.product_id = ele.product_id
        row.title = ele.title
        row.period = ele.period
        row.price = ele.currency === currency ? currency + " " + ele.price : await convert(+ele.price, currency)
        row.status = ele.status
        row.server = null
        services += 1
        if(ele.status === 'active'){ 
            row.server = await getServer(ele.id)
            active_service += 1
        }
        await final.push(row)
      }
    }

    return {
      props: { 
        services: final,
        invoices: final_invoice,
        invoice: invoices,
        paid_invoice: paid_invoice,
        service: services,
        active_services: active_service,
        user_data: user_data
      }
    }

  }
  catch(err){
    console.log(err)
    // return {
    //   redirect: {
    //     permanent: false,
    //     destination: '/login'
    //   }
    // }
  }
}

const Dashboard = ({services, service, active_services, user_data, invoices, invoice, paid_invoice}) => {
  return (
    <ApexChartWrapper>
      <Grid container spacing={6} mt={6}>
        <Grid item xs={12} md={4}>
          <Trophy info={user_data} />
        </Grid>
        <Grid item xs={12} md={8}>
          <StatisticsCard services={service} active_services={active_services} invoices={invoice} paid_invoices={paid_invoice}/>
        </Grid>
        {/* <Grid item xs={12} md={6} lg={4}>
          <WeeklyOverview />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <TotalEarning />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Grid container spacing={6}>
            <Grid item xs={6}>
              <CardStatisticsVerticalComponent
                stats='$25.6k'
                icon={<Poll />}
                color='success'
                trendNumber='+42%'
                title='Total Profit'
                subtitle='Weekly Profit'
              />
            </Grid>
            <Grid item xs={6}>
              <CardStatisticsVerticalComponent
                stats='$78'
                title='Refunds'
                trend='negative'
                color='secondary'
                trendNumber='-15%'
                subtitle='Past Month'
                icon={<CurrencyUsd />}
              />
            </Grid>
            <Grid item xs={6}>
              <CardStatisticsVerticalComponent
                stats='862'
                trend='negative'
                trendNumber='-18%'
                title='New Project'
                subtitle='Yearly Project'
                icon={<BriefcaseVariantOutline />}
              />
            </Grid>
            <Grid item xs={6}>
              <CardStatisticsVerticalComponent
                stats='15'
                color='warning'
                trend='negative'
                trendNumber='-18%'
                subtitle='Last Week'
                title='Sales Queries'
                icon={<HelpCircleOutline />}
              />
            </Grid>
          </Grid>
        </Grid> */}
        <Grid item xs={12} mt={8}>
          <Typography variant="h4">Your Services</Typography>
          <Table rows={services} />
        </Grid>
        <Grid item xs={12}>
          <InvoiceTable rows={invoices} />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default Dashboard
