// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { styled } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import MuiDivider, { DividerProps } from '@mui/material/Divider'

interface DataType {
  logo: string
  title: string
  logoWidth: number
  logoHeight: number
}

const webscriptData = [
  {
    logoWidth: 28,
    logoHeight: 29,
    title: 'School Management System',
    logo: '/images/scriptsicon/school.png'
  },
  {
    logoWidth: 38,
    logoHeight: 38,
    title: 'Hospital Management System',
    logo: '/images/scriptsicon/hospital.png'
  },
  {
    logoWidth: 20,
    logoHeight: 28,
    title: 'Zym Management System',
    logo: '/images/scriptsicon/zym.png'
  },
  {
    logoWidth: 34,
    logoHeight: 32,
    title: 'Garage Management System',
    logo: '/images/scriptsicon/garage.png'
  },
  {
    logoWidth: 33,
    logoHeight: 22,
    title: 'Restaurant Management System',
    logo: '/images/scriptsicon/restaurant.png'
  },
  {
    logoWidth: 33,
    logoHeight: 33,
    title: 'Enterprise Appointment System',
    logo: '/images/scriptsicon/enterprise.png'
  },
  {
    logoWidth: 33,
    logoHeight: 33,
    title: 'Online Quiz and Exam System',
    logo: '/images/scriptsicon/quiz.png'
  },
  {
    logoWidth: 33,
    logoHeight: 33,
    title: 'Easy Ecommerce System',
    logo: '/images/scriptsicon/easy-ecommerce.png'
  },
  {
    logoWidth: 33,
    logoHeight: 33,
    title: 'Complete Ecommerce (Web+Android+Ios)',
    logo: '/images/scriptsicon/complete-ecommerce.png'
  },
  {
    logoWidth: 33,
    logoHeight: 33,
    title: 'POS Stock Manager System',
    logo: '/images/scriptsicon/pos.png'
  },
  {
    logoWidth: 33,
    logoHeight: 33,
    title: 'Ticket support system',
    logo: '/images/scriptsicon/support.png'
  },
  {
    logoWidth: 33,
    logoHeight: 33,
    title: 'Digital Product Ecommerce System',
    logo: '/images/scriptsicon/digital-product.png'
  },
  {
    logoWidth: 33,
    logoHeight: 33,
    title: 'Product Designer System',
    logo: '/images/scriptsicon/product-designer.png'
  }

]


const appscriptData = [
  {
    logoWidth: 29,
    logoHeight: 30,
    title: 'Grocery Delivery App',
    logo: '/images/scriptsicon/app/grocery.png'
  },
  {
    logoWidth: 33,
    logoHeight: 33,
    title: 'Taxi Booking App',
    logo: '/images/scriptsicon/app/taxi.png'
  },
  {
    logoWidth: 33,
    logoHeight: 33,
    title: 'Salon Management App',
    logo: '/images/scriptsicon/app/salon.png'
  },
  {
    logoWidth: 33,
    logoHeight: 33,
    title: 'Medical Shop Management App',
    logo: '/images/scriptsicon/app/medical.png'
  },
  {
    logoWidth: 33,
    logoHeight: 33,
    title: 'Restaurant Order Management App',
    logo: '/images/scriptsicon/app/restaurant.png'
  },
  {
    logoWidth: 33,
    logoHeight: 33,
    title: 'Clinic Appointment App',
    logo: '/images/scriptsicon/app/clinic.png'
  },
  {
    logoWidth: 33,
    logoHeight: 33,
    title: 'Business Directory Listing App',
    logo: '/images/scriptsicon/app/business-directory.png'
  },
  {
    logoWidth: 33,
    logoHeight: 33,
    title: 'Socail Network Apps',
    logo: '/images/scriptsicon/app/social.png'
  },
  {
    logoWidth: 33,
    logoHeight: 33,
    title: 'Image Sharing Apps',
    logo: '/images/scriptsicon/app/image-sharing.png'
  },
  {
    logoWidth: 33,
    logoHeight: 33,
    title: 'Ludo Multiplayer Game (Android+IOS)',
    logo: '/images/scriptsicon/app/ludo.png'
  },
  {
    logoWidth: 33,
    logoHeight: 33,
    title: 'Online Chess Clone',
    logo: '/images/scriptsicon/app/chess.png'
  },
  {
    logoWidth: 33,
    logoHeight: 33,
    title: 'Snake And Ladders (Android+IOS)',
    logo: '/images/scriptsicon/app/snake.png'
  },
  {
    logoWidth: 33,
    logoHeight: 33,
    title: 'Flash Games',
    logo: '/images/scriptsicon/app/flash-game.png'
  },
  {
    logoWidth: 29,
    logoHeight: 30,
    title: 'Video calling App',
    logo: '/images/scriptsicon/clone/video-call.png'
  }
]


const clonescriptData = [
  {
    logoWidth: 29,
    logoHeight: 30,
    title: 'Youtube Clone',
    logo: '/images/scriptsicon/clone/youtube.png'
  },
  {
    logoWidth: 29,
    logoHeight: 30,
    title: 'Pinterest Clone',
    logo: '/images/scriptsicon/clone/pinterest.png'
  },
  {
    logoWidth: 29,
    logoHeight: 30,
    title: 'Olx Clone Websitee',
    logo: '/images/scriptsicon/clone/olx.png'
  },
  {
    logoWidth: 29,
    logoHeight: 30,
    title: 'Linkedin Clone',
    logo: '/images/scriptsicon/clone/linkedin.png'
  },
  {
    logoWidth: 29,
    logoHeight: 30,
    title: 'Bigbasket Clone',
    logo: '/images/scriptsicon/clone/bigbasket.png'
  },
  {
    logoWidth: 29,
    logoHeight: 30,
    title: 'Blinkit Clone',
    logo: '/images/scriptsicon/clone/blinkit.png'
  },
  {
    logoWidth: 29,
    logoHeight: 30,
    title: 'Amazon Clone',
    logo: '/images/scriptsicon/clone/amazon.png'
  },
  {
    logoWidth: 29,
    logoHeight: 30,
    title: 'Instagram Clone',
    logo: '/images/scriptsicon/clone/instagram.png'
  },
  {
    logoWidth: 29,
    logoHeight: 30,
    title: 'Tiktok Clone',
    logo: '/images/scriptsicon/clone/tiktok.png'
  },
  {
    logoWidth: 29,
    logoHeight: 30,
    title: 'Whatsapp Clone',
    logo: '/images/scriptsicon/clone/whatsapp.png'
  },
  {
    logoWidth: 29,
    logoHeight: 30,
    title: 'Spotify Streaming Clone',
    logo: '/images/scriptsicon/clone/spotify.png'
  },
  {
    logoWidth: 29,
    logoHeight: 30,
    title: 'Taxi Booking Clone',
    logo: '/images/scriptsicon/clone/taxi.png'
  },
  {
    logoWidth: 29,
    logoHeight: 30,
    title: 'Swiggy Clone',
    logo: '/images/scriptsicon/clone/swiggy.png'
  },
  {
    logoWidth: 29,
    logoHeight: 30,
    title: 'Zomato Clone',
    logo: '/images/scriptsicon/clone/zomato.png'
  }
]

const softscriptData = [
  {
    logoWidth: 29,
    logoHeight: 30,
    title: 'Booking Applications',
    logo: '/images/scriptsicon/softwares/booking.png'
  },
  {
    logoWidth: 29,
    logoHeight: 30,
    title: 'CRM Solution',
    logo: '/images/scriptsicon/softwares/crm.png'
  },
  {
    logoWidth: 29,
    logoHeight: 30,
    title: 'Complete Ecommerce PC Software',
    logo: '/images/scriptsicon/softwares/complete-ecommerce.png'
  },
  {
    logoWidth: 29,
    logoHeight: 30,
    title: 'Loan Management System',
    logo: '/images/scriptsicon/softwares/loan.png'
  },
  {
    logoWidth: 29,
    logoHeight: 30,
    title: 'Jewellery E-commerce System',
    logo: '/images/scriptsicon/softwares/jewellery.png'
  },
  {
    logoWidth: 29,
    logoHeight: 30,
    title: 'Dating Website System',
    logo: '/images/scriptsicon/softwares/dating.png'
  },
  {
    logoWidth: 29,
    logoHeight: 30,
    title: 'Dating Video Call System',
    logo: '/images/scriptsicon/softwares/video-calling.png'
  },
  {
    logoWidth: 29,
    logoHeight: 30,
    title: 'Appointment Booking System',
    logo: '/images/scriptsicon/appointment.png'
  },
  {
    logoWidth: 29,
    logoHeight: 30,
    title: 'Medical Management System',
    logo: '/images/scriptsicon/softwares/medical.png'
  },
  {
    logoWidth: 29,
    logoHeight: 30,
    title: 'E-Learning System',
    logo: '/images/scriptsicon/softwares/e-learning.png'
  },
  {
    logoWidth: 29,
    logoHeight: 30,
    title: 'Event Booking System',
    logo: '/images/scriptsicon/softwares/event-booking.png'
  },
  {
    logoWidth: 29,
    logoHeight: 30,
    title: 'Domain Manager System',
    logo: '/images/scriptsicon/softwares/domain.png'
  },
  {
    logoWidth: 29,
    logoHeight: 30,
    title: 'Auction System',
    logo: '/images/scriptsicon/softwares/auction.png'
  },
  {
    logoWidth: 29,
    logoHeight: 30,
    title: 'GPS Vehicle Tracking System',
    logo: '/images/scriptsicon/softwares/gps.png'
  },
  {
    logoWidth: 29,
    logoHeight: 30,
    title: 'Car Rental Software',
    logo: '/images/scriptsicon/softwares/car-rental.png'
  },
  {
    logoWidth: 29,
    logoHeight: 30,
    title: 'Delivery Management Software',
    logo: '/images/scriptsicon/softwares/delivery.png'
  },
  {
    logoWidth: 29,
    logoHeight: 30,
    title: 'Point Of Sale Software',
    logo: '/images/scriptsicon/softwares/pos.png'
  },
  {
    logoWidth: 29,
    logoHeight: 30,
    title: 'Hotel Booking Software',
    logo: '/images/scriptsicon/softwares/hotel-booking.png'
  },
  {
    logoWidth: 29,
    logoHeight: 30,
    title: 'User Management System',
    logo: '/images/scriptsicon/softwares/user.png'
  },
  {
    logoWidth: 29,
    logoHeight: 30,
    title: 'ERP System Software Development',
    logo: '/images/scriptsicon/softwares/erp.png'
  }
]

// Styled Divider component
const Divider = styled(MuiDivider)<DividerProps>(({ theme }) => ({
  margin: theme.spacing(5, 0),
  borderRight: `1px solid ${theme.palette.divider}`,
  [theme.breakpoints.down('md')]: {
    borderRight: 'none',
    margin: theme.spacing(0, 5),
    borderBottom: `1px solid ${theme.palette.divider}`
  }
}))

const ReadymadeScripts = () => {
  return (
    <Card sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: ['column', 'column', 'row'] }}>
      <Box sx={{ width: '100%' }}>
        <CardHeader
         title={<h3>Readymade Web Scripts</h3>}
          sx={{ pt: 5.5, alignItems: 'center', '& .MuiCardHeader-action': { mt: 0.6 } }}
          
          titleTypographyProps={{
            variant: 'h6',
            sx: { lineHeight: '1.6 !important', letterSpacing: '0.15px !important' }
          }}
        />
        <CardContent sx={{ pb: theme => `${theme.spacing(5.5)} !important` }}>
          {webscriptData.map((item: DataType, index: number) => {
            return (
              <Box
                key={item.title}
                sx={{ display: 'flex', alignItems: 'center', mb: index !== webscriptData.length - 1 ? 6 : 0 }}
              >
                <Box sx={{ minWidth: 38, display: 'flex', justifyContent: 'center' }}>
                  <img src={item.logo} alt={item.title} width={item.logoWidth} height={item.logoHeight} />
                </Box>
                <Box
                  sx={{
                    ml: 4,
                    width: '100%',
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <Box sx={{ marginRight: 2, display: 'flex', flexDirection: 'column' }}>
                    <Typography sx={{ fontWeight: 600, fontSize: '0.875rem' }}>{item.title}</Typography>
                  </Box>
                  
                </Box>
              </Box>
            )
          })}
        </CardContent>
      </Box>

      <Divider flexItem />

      <Box sx={{ width: '100%' }}>
        <CardHeader
          title={<h3>Readymade App Solutions</h3>}
          sx={{ pt: 5.5, alignItems: 'center', '& .MuiCardHeader-action': { mt: 0.6 } }}
         
          titleTypographyProps={{
            variant: 'h6',
            sx: { lineHeight: '1.6 !important', letterSpacing: '0.15px !important' }
          }}
        />
        <CardContent sx={{ pb: theme => `${theme.spacing(5.5)} !important` }}>
          {appscriptData.map((item: DataType, index: number) => {
            return (
              <Box
                key={item.title}
                sx={{ display: 'flex', alignItems: 'center', mb: index !== appscriptData.length - 1 ? 6 : 0 }}
              >
                <Box sx={{ minWidth: 36, display: 'flex', justifyContent: 'center' }}>
                  <img src={item.logo} alt={item.title} width={item.logoWidth} height={item.logoHeight} />
                </Box>
                <Box
                  sx={{
                    ml: 4,
                    width: '100%',
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <Box sx={{ marginRight: 2, display: 'flex', flexDirection: 'column' }}>
                    <Typography sx={{ fontWeight: 600, fontSize: '0.875rem' }}>{item.title}</Typography>
                   
                  </Box>
                 
                </Box>
              </Box>
            )
          })}
        </CardContent>
      </Box>
      <Divider flexItem />
      <Box sx={{ width: '100%' }}>
        <CardHeader
          title={<h3>Clone Web/App Scripts</h3>}
          sx={{ pt: 5.5, alignItems: 'center', '& .MuiCardHeader-action': { mt: 0.6 } }}
          
          titleTypographyProps={{
            variant: 'h6',
            sx: { lineHeight: '1.6 !important', letterSpacing: '0.15px !important' }
          }}
        />
        <CardContent sx={{ pb: theme => `${theme.spacing(5.5)} !important` }}>
          {clonescriptData.map((item: DataType, index: number) => {
            return (
              <Box
                key={item.title}
                sx={{ display: 'flex', alignItems: 'center', mb: index !== clonescriptData.length - 1 ? 6 : 0 }}
              >
                <Box sx={{ minWidth: 38, display: 'flex', justifyContent: 'center' }}>
                  <img src={item.logo} alt={item.title} width={item.logoWidth} height={item.logoHeight} />
                </Box>
                <Box
                  sx={{
                    ml: 4,
                    width: '100%',
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <Box sx={{ marginRight: 2, display: 'flex', flexDirection: 'column' }}>
                    <Typography sx={{ fontWeight: 600, fontSize: '0.875rem' }}>{item.title}</Typography>
                  </Box>
                  
                </Box>
              </Box>
            )
          })}
        </CardContent>
      </Box>
      <Divider flexItem />
      <Box sx={{ width: '100%' }}>
        <CardHeader
          title={<h3>Software Solutions</h3>}
          sx={{ pt: 5.5, alignItems: 'center', '& .MuiCardHeader-action': { mt: 0.6 } }}
          
          titleTypographyProps={{
            variant: 'h6',
            sx: { lineHeight: '1.6 !important', letterSpacing: '0.15px !important' }
          }}
        />
        <CardContent sx={{ pb: theme => `${theme.spacing(5.5)} !important` }}>
          {softscriptData.map((item: DataType, index: number) => {
            return (
              <Box
                key={item.title}
                sx={{ display: 'flex', alignItems: 'center', mb: index !== softscriptData.length - 1 ? 6 : 0 }}
              >
                <Box sx={{ minWidth: 38, display: 'flex', justifyContent: 'center' }}>
                  <img src={item.logo} alt={item.title} width={item.logoWidth} height={item.logoHeight} />
                </Box>
                <Box
                  sx={{
                    ml: 4,
                    width: '100%',
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <Box sx={{ marginRight: 2, display: 'flex', flexDirection: 'column' }}>
                    <Typography sx={{ fontWeight: 600, fontSize: '0.875rem' }}>{item.title}</Typography>
                  </Box>
                  
                </Box>
              </Box>
            )
          })}
        </CardContent>
      </Box>
    </Card>
  )
}

export default ReadymadeScripts
