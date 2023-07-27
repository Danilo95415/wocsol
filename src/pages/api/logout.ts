const Cookies = require('js-cookie')

const handler = (req, res) => {
    res.setHeader(
        "Set-Cookie", ["uid_token=deleted; Max-Age=0"]
    )
    res.send({status: 200})
}

export default handler