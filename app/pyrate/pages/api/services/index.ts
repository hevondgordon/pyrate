// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { pyrateInternalAPIClient } from '../../../data/utils'
import { GenericData } from '../../../types'

export const ROUTE = '/api/services/'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GenericData>
) {
  const response = await pyrateInternalAPIClient.get('/__internals__/get_external_services');
  console.log(response.data);
  
  res.status(200).json(response.data)
}
