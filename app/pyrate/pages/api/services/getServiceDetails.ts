// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { pyrateExternalAPIClient } from '../../../data/utils'

export const ROUTE = `/api/services/getServiceDetails/`

type Data = {
    name: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const { model, id } = req.query

    let response = null;

    if (model && id) {
        response = await pyrateExternalAPIClient.get(`${model}/${id}`);
        res.status(200).json(response.data)
    }
}