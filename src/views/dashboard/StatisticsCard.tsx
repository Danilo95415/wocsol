// ** React Imports
import { ReactElement } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icons Imports
import TrendingUp from 'mdi-material-ui/TrendingUp'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import DotsVertical from 'mdi-material-ui/DotsVertical'
import CellphoneLink from 'mdi-material-ui/CellphoneLink'
import AccountOutline from 'mdi-material-ui/AccountOutline'

// ** Types
import { ThemeColor } from 'src/@core/layouts/types'

interface DataType {
  stats: string
  title: string
  color: ThemeColor
  icon: ReactElement
}

const renderStats = (services, active_services, invoices, paid_invoices) => {

  const salesData: DataType[] = [
    {
      stats: services.toString(),
      color: 'primary',
      title: 'Total Services',
      icon: <CellphoneLink sx={{ fontSize: '1.75rem' }} />
    },
    {
      stats: active_services.toString(),
      title: 'Active Services',
      color: 'success',
      icon: <TrendingUp sx={{ fontSize: '1.75rem' }} />
    },
    {
      stats: invoices.toString(),
      color: 'info',
      title: 'Total Invoices',
      icon: <CellphoneLink sx={{ fontSize: '1.75rem' }} />
    },
    {
      stats: paid_invoices.toString(),
      title: 'Paid Invoices',
      color: 'success',
      icon: <AccountOutline sx={{ fontSize: '1.75rem' }} />
    }
    
  ]

  return salesData.map((item: DataType, index: number) => (
    <Grid item xs={12} sm={3} key={index}>
      <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar
          variant='rounded'
          sx={{
            mr: 3,
            width: 44,
            height: 44,
            boxShadow: 3,
            color: 'common.white',
            backgroundColor: `${item.color}.main`
          }}
        >
          {item.icon}
        </Avatar>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant='caption'>{item.title}</Typography>
          <Typography variant='h6'>{item.stats}</Typography>
        </Box>
      </Box>
    </Grid>
  ))
}

const StatisticsCard = ({services, active_services, paid_invoices, invoices}) => {
  return (
    <Card>
      <CardHeader
        title='Statistics Card'
        subheader={
          <Typography variant='body2'>
            Here is a summary of your previous orders
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
      <CardContent sx={{ pt: theme => `${theme.spacing(3)} !important` }}>
        <Grid container spacing={[5, 0]}>
          {renderStats(services, active_services, invoices, paid_invoices)}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default StatisticsCard
