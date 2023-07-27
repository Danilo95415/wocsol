const axios = require('axios')

const handler = async (req, res) => {
    const uid = req.cookies.uid_token
    const token:number = +atob(uid).split(" ")[1].substring(10,)

    const instance = await axios.create({
        baseURL: 'https://secure.webhosting.live/api/',
        headers: {
            'Authorization': 'Basic YWRtaW46bGNsY0dselRlbWNkdWM5ODhtd2d3MmJXd2p3czhTemM=',
            'Content-Type': 'application/json',
        }
    })

    await instance.post('/admin/invoice/get_list', {
        client_id: token
    })
        .then(({data}) => {
            res.send(data.result.list)
        })
        .catch(err => {
            console.log(err)
            res.send({status: 500})
        })
}

export default handler;