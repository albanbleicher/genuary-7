// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
type Data = {
  message?: string
  error?: string
  access_token?: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const options = {
    method: 'POST',
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${Buffer.from(
        process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOITFY_CLIENT_SECRET
      ).toString('base64')}`,
    },
    data: { grant_type: 'client_credentials' },
  }

  try {
    const {
      data: { access_token },
    } = (await axios.request(options)) as any
    res.status(200).json({ access_token })
  } catch (error: any) {
    console.log(error)
    res.status(400).json({ message: 'Error occured', ...error })
  }
}
