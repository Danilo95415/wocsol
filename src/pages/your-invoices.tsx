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

    const invoice = await fetch('https://secure.webhosting.live/api/admin/invoice/get_list', {
      method: 'POST',
      headers: {
        'Authorization': 'Basic YWRtaW46bGNsY0dselRlbWNkdWM5ODhtd2d3MmJXd2p3czhTemM=',
        'Content-Type': 'application/json',
      }
    })

    const invoice_data = await invoice.json();
    const currency = await getCurrency(uid_token);
    let final_invoice = [];
    let paid_invoice:number = 0
    let invoices:number = 0;
    for(let ele of invoice_data.result.list){
        // console.log(ele)
        let row = {}
        if(ele.client.id === uid_token){
          row.title = ele.lines[0].title
          row.period = ele.lines[0].period
          row.price = await convert(+ele.lines[0].price, currency)
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
          final_invoice.push(row)
          invoices += 1
          if(ele.status === 'paid'){ 
            paid_invoice += 1
          }
        }
    }

    console.log(invoice_data.result.list)
    return {
      props: { 
        invoices: final_invoice
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

const Dashboard = ({ invoices }) => {
  return (
    <ApexChartWrapper>
      <Grid container spacing={6} mt={2}>
        <Grid item xs={12} >
          <InvoiceTable rows={invoices} />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default Dashboard
