import { useState, useEffect } from 'react'
import { Button, Card, CardContent, CardHeader, Box, Typography, Switch, FormControlLabel, Grid, Chip } from '@mui/material'
import { Icon } from '@iconify/react'
import { getProducts } from '../pages/api/swh'
import { useRouter } from 'next/router'
import { remark } from 'remark';
import html from 'remark-html';
import { Fragment } from 'react'

function SwhPricing(props) {
  const { products } = props
  const [isAnnually, setIsAnnually] = useState(false)
  // const [products,  setProducts] = useState(props.products) 

  const handleToggle = () => {
    setIsAnnually(!isAnnually)
  }

  const router = useRouter()

  return (
    <Card sx={{mt: 4}}>
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
        <Grid container spacing={2} sx={{ mt: 4, justifyContent: 'center' }}>
          {products.map(service => (
            <Grid
              item
              xs={12}
              md={3}
              key={service.id}
              sx={{
                gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
                gap: 3,
                border: '3px solid #a22e50',
                padding: 3,
                borderRadius: 5,
                margin: 2
              }}
            >
              <Box sx={{ textAlign: 'center' }}>
                <Box
                  sx={{
                    gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
                    gap: 3,
                    border: '1px solid #a22e50',
                    padding: 3,
                    borderRadius: 5
                  }}
                >
                  <Box sx={{ mb: 2 }}>
                    <Icon icon={service.icon} color='#a22e50' width='50' />
                  </Box>

                  <Typography variant='h5' sx={{ mb: 1 }}>
                    {service.title}
                  </Typography>
                </Box>
                  
                <Typography variant='h6' sx={{ mt: 4 }}>
                  Top Features
                </Typography>
                <Typography variant='body2' sx={{ mb: 4 }}>
                  {service.features.split(/\n/).slice(2,).map(line => <Fragment key={line}>{line}<br/></Fragment>)}
                </Typography>
                <Typography variant='h4' sx={{ mb: 1 }}>
                  ${isAnnually ? service.pricing['1Y'].price : service.pricing['1M'].price}
                  <Typography variant='body2' component='span'>
                    /{isAnnually ? 'year' : 'month'}
                  </Typography>
                </Typography>
                <Typography variant='h4' sx={{ mb: 1 }}>
                  {isAnnually ? null : `$${service.pricing['6M'].price}`}
                  <Typography variant='body2' component='span'>
                    {isAnnually ? null : '/6 months'}
                  </Typography>
                </Typography>
                <Button fullWidth size="large" variant="contained" sx={{ mt: 4}} onClick={() => router.push({
                  pathname: '/checkout',
                  query: {plan: service.id, promo: (isAnnually ? true : false) }
                })}>
                    Choose Plan
                </Button>
              </Box>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default SwhPricing
