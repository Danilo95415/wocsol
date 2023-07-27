const axios = require('axios')

const handler = async (req, res) => {
    const instance = await axios.create({
        baseURL: 'https://secure.webhosting.live/api/',
        headers: {
            'Authorization': 'Basic YWRtaW46bGNsY0dselRlbWNkdWM5ODhtd2d3MmJXd2p3czhTemM=',
            'Content-Type': 'application/json',
        }
    })

    await instance.post('/admin/order/create', req.body)
        .then(({data}) => {
            res.send({status: 200})
        })
        .catch((err) => {
            console.log(err)
            res.send({status: 500})
        })
}

export default handler