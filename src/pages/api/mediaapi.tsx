import { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { url } = req.query;
    const response = await fetch(`https://www.instagram.com/p/${url}/?__a=1`);
    const data = await response.json();
    const downloadUrl = data.graphql.shortcode_media.video_url || data.graphql.shortcode_media.display_url;
    res.status(200).json({ downloadUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
