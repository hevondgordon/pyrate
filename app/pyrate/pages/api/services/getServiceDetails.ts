// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { pyrateExternalAPIClient } from '../../../data/utils'
import { GenericData } from '../../../types';

export const ROUTE = `/api/services/getServiceDetails/`

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<GenericData>
) {
    const { model, id } = req.query

    let response = null;

    if (model && id) {
        response = await pyrateExternalAPIClient.get(`${model}/${id}`);
        if (Array.isArray(response.data)) {
            response.data = response.data[0];
        }
        res.status(200).json(response.data)
    }
}
