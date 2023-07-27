// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'
import InvoicePopup from 'src/components/invoicePopup'

// ** Types Imports
import { ThemeColor } from 'src/@core/layouts/types'
import { useAxios } from 'utils/axios'
import { useEffect, useState } from 'react'


interface StatusObj {
  [key: string]: {
    color: ThemeColor
  }
}

const statusObj: StatusObj = {
  cancelled: { color: 'warning' },
  unpaid: { color: 'error' },
  paid: { color: 'success' },
}

const DashboardTable = ({ rows }) => {

  return (
    <Card>
        <Typography variant="h4" sx={{mt: 4, ml: 4}}>Your Invoices</Typography>
      <TableContainer>
        <Table sx={{ minWidth: 800 }} aria-label='table in dashboard'>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Period</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>View</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow hover key={row.name} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                <TableCell>{row.title}</TableCell>
                <TableCell>{row.price}</TableCell>
                <TableCell>{row.period}</TableCell>
                <TableCell>
                  <Chip
                    label={row.status}
                    color={statusObj[row.status].color}
                    sx={{
                      height: 24,
                      fontSize: '0.75rem',
                      textTransform: 'capitalize',
                      '& .MuiChip-label': { fontWeight: 500 }
                    }}
                  />
                </TableCell>
                <TableCell>
                  { row.product_id !== 1 ? 
                  <InvoicePopup invoice={row}/> 
                  : null
                  }
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}

export default DashboardTable
