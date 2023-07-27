const handler = (req, res) => {
    const { req } = context
    const uid = req.cookies.uid_token
  
    try{
      const token = atob(uid).split(" ")[0].substring(11,)
      console.log(token)
    }
    catch(err){
      console.log(err)
    }
}

export default handler