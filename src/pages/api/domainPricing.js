import axios from 'axios';
import cheerio from 'cheerio';

export default async (req, res) => {
  try {
    const url = 'https://wocsol.supersite2.myorderbox.com/domain-registration/domain-registration-price.php';
    const response = await axios.get(url, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      },
    });
    const $ = cheerio.load(response.data);

    // Find the div element with class "row-white"
    const rowWhiteDiv = $('.row-white');

    // Extract the HTML content of the div
    const rowWhiteHTML = rowWhiteDiv.html();

    // Send the rowWhiteHTML in the response
    res.status(200).send(rowWhiteHTML);
  } catch (error) {
    console.error('Error occurred:', error);
    res.status(500).json({ error: 'An error occurred while fetching domain pricing data.' });
  }
};
