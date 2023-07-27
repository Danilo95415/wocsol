const axios = require('axios')

const getCurrency = async (client_id) => {
  const response = await fetch('https://secure.webhosting.live/api/admin/client/get', {
        method: 'POST',
        headers: {
          'Authorization': 'Basic YWRtaW46bGNsY0dselRlbWNkdWM5ODhtd2d3MmJXd2p3czhTemM=',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: client_id
        })
    })

  const currency = await response.json()
  return currency.result.currency;
}

const convert = async (amount, currency) => {
  const server = await fetch('https://secure.webhosting.live/api/guest/currency/format', {
              method: 'POST',
              headers: {
              'Authorization': 'Basic YWRtaW46bGNsY0dselRlbWNkdWM5ODhtd2d3MmJXd2p3czhTemM=',
              'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  price: amount, 
                  code: currency
              })
          })

  const dat = await server.json()
  return dat.result
}

const getProducts = async (req, res) => {
  let products = []
  let currency = "INR"
  try{
    const uid = req.cookies.uid_token;

    const uid_token = +atob(uid).split(" ")[1].substring(10,)
  
    currency = await getCurrency(uid_token)
  }
  catch(err){
    console.log(err)
  }
  
  await axios.post('https://secure.webhosting.live/api/guest/product/get_list')
    .then(({data}) => {
      // console.log(data.result.list);
      [...data.result.list].forEach(ele => {
        const row = {}
        if(ele.id === 4 || ele.id === 5 || ele.id === 6){
          row.id = ele.id
          row.title = ele.title
          row.features = ele.description
          switch(ele.id){
            case 4: row.icon = "healthicons:low-bars"
            case 5: row.icon = "healthicons:medium-bars"
            case 6: row.icon = "healthicons:high-bars"
          }
          row.pricing = []
          products.push(row)
        }
      })
    })

  const csrfToken = req.headers['x-csrf-token'];
  
  const list = await fetch('https://secure.webhosting.live/api/guest/product/get_list')
  
  const data = await list.json()
  let cnt = 0;
  for(let ele of data.result.list){
    if(ele.type === 'hosting' && ele.pricing.type !== 'free'){
      // ele.pricing.recurrent['1M'].price = currency === 'INR' ? ele.pricing.recurrent['1M'].price :  await convert(ele.pricing.recurrent['1M'].price, currency)
      // ele.pricing.recurrent['6M'].price = currency === 'INR' ? ele.pricing.recurrent['6M'].price :  await convert(ele.pricing.recurrent['6M'].price, currency)
      // ele.pricing.recurrent['1Y'].price = currency === 'INR' ? ele.pricing.recurrent['1Y'].price :  await convert(ele.pricing.recurrent['1Y'].price, currency)
      products[cnt].pricing = ele.pricing.recurrent
      // console.log(products[cnt])
      cnt += 1
    }
  }
  res.send(products);
}


export default getProducts