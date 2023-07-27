const axios = require('axios')

const handler = async (req, res) => {
    const apiUrl =`https://domaincheck.httpapi.com/api/domains/available.json?auth-userid=756181&api-key=LfYnNn4ml2Y1QlI94txiryOyB3CZd77Z&domain-name=${req.body.sld}&tlds=${req.body.tld}`
    await axios.get(`https://registration.domain.com/domains/available/${req.body.sld}.${req.body.tld}?propertyID=47`)
    .then(({data}) => { 
        console.log(data)
        res.send({status: 200, ...data})
    })
    .catch(err => {
        console.log(err)
        res.send({status: 500})
    })
}

export default handler;