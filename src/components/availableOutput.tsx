import {Box, Card, CardContent} from '@mui/material'

const register = ({domain, selectedTLDs}) => {
    return (
        <div>
            <Card sx={{ mt:15, padding:3 }}>
                <h2>Domain Availability Result:</h2>       
                 <CardContent sx={{ p:0, m:0 }}>
                 <Box sx={{ p:0, color: 'green' }}>
                <h3>Domain Name: {domain + '.' + selectedTLDs[0]}</h3>
                <h3>Status: Domain is available.</h3>
                </Box> 
                </CardContent>                   
            </Card>
        </div>
    )
}

export default register