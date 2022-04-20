// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { pyrateAPIClient } from '../../../data/utils'
import { GenericData } from '../../../types';

export const ROUTE = `/api/services/delete/`;

type Data = {
    name: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<GenericData>
) {
    const { service } = req.query
    const response = await pyrateAPIClient.delete(`/__internals__/delete_service?service=${service}`);
    res.status(200).json(response.data)

}
