const axios = require('axios')

const handler = async (req, res) => {
    await axios.post('https://secure.webhosting.live/api/guest/currency/format', {
        price: +req.body.price,
        code: req.body.code
    })
    .then(({data}) => {
        res.send(data)
    })
    .catch(err => {
        console.log(err)
        res.send({status: 500})
    })
}

export default handler;