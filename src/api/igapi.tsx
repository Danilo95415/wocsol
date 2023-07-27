import { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { url } = req.query;
    const response = await fetch(`https://www.instagram.com${url}?__a=1`);
    const json = await response.json();
    const videoUrl = json?.graphql?.shortcode_media?.video_url;
    if (videoUrl) {
      const videoResponse = await fetch(videoUrl);
      const videoBuffer = await videoResponse.buffer();
      res.setHeader('Content-Type', 'video/mp4');
      res.setHeader('Content-Disposition', 'attachment; filename=instagram-video.mp4');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Accept-Ranges', 'bytes');
      res.setHeader('Content-Length', videoBuffer.length);
      res.send(videoBuffer);
    } else {
      res.status(400).send('Video not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

export default handler;
