// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { pyrateInternalAPIClient } from '../../data/utils'

export const ROUTE = 'api/services/'

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const response = await pyrateInternalAPIClient.get('/__internals__/get_external_services');
  console.log(response.data);
  
  res.status(200).json(response.data)
}
