const axios = require('axios')

const handler = (req, res) => {
    const instance = axios.create({
        baseUrl: 'https://secure.webhosting.live/api/',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    axios.post('https://secure.webhosting.live/api/guest/client/create', req.body)
        .then(({data}) => {
            console.log(data)
            if(data.result !== null){
                res.send(JSON.stringify({status: 200, user: data.result}))
            }
            else{
                res.send(JSON.stringify({status: 500}))
            }
        })
        .catch(({err}) => {
            console.log(err)
            res.send(JSON.stringify({status: 500, data: err}))
        })
}

export default handler