// ** MUI Imports
import Grid from '@mui/material/Grid'
import { useEffect, useState } from 'react'
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


    const currency:string = await getCurrency(uid_token)
    const listing = data.result.list
    let final = [];
    let active_service:number = 0
    let services:number = 0;
    for(let ele of listing){
      let row = {}
      if(ele.client.id === uid_token){
        row.id = ele.id
        row.title = ele.title
        row.period = ele.period
        row.price = await convert(+ele.price, currency)
        row.status = ele.status
        row.server = null
        if(ele.status === 'active'){ 
            row.server = await getServer(ele.id)
            active_service += 1
            services += 1
        }
        await final.push(row)
      }
    }

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
        props:{
            services: []
        }
    //   redirect: {
    //     permanent: false,
    //     destination: '/login'
    //   }
    }
  }
}

const Dashboard = ({services, client_id}) => {
  return (
    <ApexChartWrapper>
      <Grid container spacing={6} mt={2}>
        <Grid item xs={12} >
          <Typography variant="h4">Your Services</Typography>
          <Table rows={services} />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default Dashboard
