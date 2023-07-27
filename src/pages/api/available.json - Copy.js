import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { tlds } = req.query;
  const domain = req.query['domain-name']; // Access the parameter using square bracket notation
  const authUserId = "756181";
  const apiKey = "LfYnNn4ml2Y1QlI94txiryOyB3CZd77Z";
  
  const url = `https://domaincheck.httpapi.com/api/domains/available.json?auth-userid=${authUserId}&api-key=${apiKey}&domain-name=${domain}&tlds=${tlds}`;

  
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      res.status(200).json(data);
    } else {
      throw new Error(response.statusText);
    }
  } catch (error) {
    const errorMessage = error.response && error.response.data ? error.response.data : 'Internal Server Error';
    res.status(500).json({ error: errorMessage });
  }
}
