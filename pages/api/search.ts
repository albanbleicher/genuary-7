// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
type Data = {
  results?: object[]
  message?: string
  error?: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  var options = {
    method: 'GET',
    url: 'https://api.spotify.com/v1/search',
    params: { q: req.body.query, type: 'track' },
    headers: {
      Authorization: `Bearer ${req.body.token}`,
    },
  }
  try {
    const {
      data: {
        tracks: { items },
      },
    } = (await axios.request(options)) as any

    res.status(200).json({ results: items })
  } catch (error: any) {
    res.status(400).json({ message: 'Bad request', error })
  }
}
