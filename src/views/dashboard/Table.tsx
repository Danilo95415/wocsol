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
import { Button } from '@mui/material'
// ** Types Imports
import { ThemeColor } from 'src/@core/layouts/types'
import Popup from 'src/components/popup'
import { useState, useEffect } from 'react'

interface StatusObj {
  [key: string]: {
    color: ThemeColor
  }
}

const statusObj: StatusObj = {
  failed_renew: { color: 'error' },
  failed_setup: { color: 'error'},
  current: { color: 'primary' },
  suspended: {color: 'info'},
  pending_setup: { color: 'warning' },
  active: { color: 'success' }
};


const DashboardTable = ({ rows }) => {
  const [rowss, setRow] = useState([])

  useEffect(() => {
    setRow(rows)
  }, [rows])

  return (
    <Card>
      <TableContainer>
        <Table sx={{ minWidth: 800 }} aria-label='table in dashboard'>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Period</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Manage</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {rowss.map((row) => (
              <TableRow hover key={row.title} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
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
                  { (row.status === 'active' && row.product_id !== 1)  ? (
                  <Popup server={row.server} />
                  ) : '--'}
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
