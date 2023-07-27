const axios = require('axios')

const handler = async (req, res) => {
    const { id, field } = req.query
    
    const instance = await axios.create({
        baseURL: 'https://secure.webhosting.live/api/',
        headers: {
            'Authorization': 'Basic YWRtaW46bGNsY0dselRlbWNkdWM5ODhtd2d3MmJXd2p3czhTemM=',
            'Content-Type': 'application/json',
        }
    })

    await instance.post('/admin/client/get', {
        id: id
    })
    .then(({data}) => {
        let obj = {};
        [...field].forEach(ele => {
            obj[ele] = data.result[ele]
        })
        res.send({ status: 200, data: obj })
    })
    .catch((err) => {
        console.log(err)
        res.send({status: 500})
    })
}

export default handler