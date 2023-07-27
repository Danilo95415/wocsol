import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email, password } = req.body;

  // Retrieve the CSRF token from the meta tag
  const csrfToken = req.headers['x-csrf-token'];

  try {
    const response = await axios.post(
      'https://secure.webhosting.live/api/guest/client/login',
      { email, password },
      {
        headers: {
          'X-CSRF-Token': csrfToken, // Pass the CSRF token in the request headers
        },
      }
    );

    if (response.data.error) {
      res.status(400).json({ error: response.data.error.message });
    } else {
      res.status(200).json(response.data);
    }
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
}
