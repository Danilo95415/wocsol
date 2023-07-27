
import { useState } from 'react'
import { Card, CardContent, CardHeader, Box, Typography, Switch, FormControlLabel, Grid, Chip } from '@mui/material'
import { Icon } from '@iconify/react';



const pricing = (props) => {
  const [isAnnually, setIsAnnually] = useState(false)

  const handleToggle = () => {
    setIsAnnually(!isAnnually)
  }

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Typography variant='h4'>Shared Web Hosting Pricing Plans</Typography>
        </Box>
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
          <Typography variant='body2'>
            All plans include 40+ advanced tools and features to boost your product.
          </Typography>
          </Box>
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
          <Typography variant='body2'>Choose the best plan to fit your needs.</Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            mt: 2,
            justifyContent: 'center'
          }}
        >
          <FormControlLabel
            control={<Switch size='medium' checked={!isAnnually} onChange={handleToggle} />}
            label='Monthly'
          />
          <FormControlLabel
            control={<Switch size='medium' checked={isAnnually} onChange={handleToggle} />}
            label='Annually'
          />
          {isAnnually && (
            <Box sx={{ ml: 1 }}>
              <Chip label='Save up to 10%' color='primary' variant='filled' size='small' />
            </Box>
          )}
        </Box>
        <Grid container spacing={2} sx={{ mt: 4 }}>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center' }}>
                <Box sx={{ mb: 2 }}>
                  <Icon icon="carbon:skill-level-basic" color="#a22e50" width="50"  />
                </Box>
                <Typography variant='h5' sx={{ mb: 1 }}>
                  Basic
                </Typography>
                <Typography variant='body2' sx={{ mb: 2 }}>
                Basic Shared Web Hosting
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'baseline',
                    mb: 2
                  }}
                >
                  <Typography variant='body2' sx={{ mr: 0.5 }}>
                    $
                  </Typography>
                  <Typography variant='h3' sx={{ mr: 0.5 }}>
                    0
                  </Typography>
                  <Typography variant='body2'>/month</Typography>
                </Box>
                <Box>
                  <Typography variant='body2'>10 projects and up to 1000 records</Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center' }}>
                <Box sx={{ mb: 2 }}>
                  <Icon icon="carbon:skill-level-intermediate" color="#a22e50" width="50"  />
                </Box>
                <Typography variant='h5' sx={{ mb: 1 }}>
                  Basic
                </Typography>
                <Typography variant='body2' sx={{ mb: 2 }}>
                Basic Shared Web Hosting
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'baseline',
                    mb: 2
                  }}
                >
                  <Typography variant='body2' sx={{ mr: 0.5 }}>
                    $
                  </Typography>
                  <Typography variant='h3' sx={{ mr: 0.5 }}>
                    0
                  </Typography>
                  <Typography variant='body2'>/month</Typography>
                </Box>
                <Box>
                  <Typography variant='body2'>10 projects and up to 1000 records</Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center' }}>
                <Box sx={{ mb: 2 }}>
                  <Icon icon="carbon:skill-level-advanced" color="#a22e50" width="50"  />
                </Box>
                <Typography variant='h5' sx={{ mb: 1 }}>
                  Basic
                </Typography>
                <Typography variant='body2' sx={{ mb: 2 }}>
                Basic Shared Web Hosting
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'baseline',
                    mb: 2
                  }}
                >
                  <Typography variant='body2' sx={{ mr: 0.5 }}>
                    $
                  </Typography>
                  <Typography variant='h3' sx={{ mr: 0.5 }}>
                    0
                  </Typography>
                  <Typography variant='body2'>/month</Typography>
                </Box>
                <Box>
                  <Typography variant='body2'>10 projects and up to 1000 records</Typography>
                </Box>
              </Box>
            </Grid>
         
        </Grid>
        

      </CardContent>
    </Card>
  )
}

export default pricing

