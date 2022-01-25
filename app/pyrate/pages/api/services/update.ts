// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { pyrateExternalAPIClient } from '../../../data/utils'
import { GenericData } from '../../../types'

export const ROUTE = `/api/services/update/`

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<GenericData>
) {
    const { service, serviceId } = req.query;
    const data = req.body as GenericData;

    let response = null;

    if (service && serviceId) {
        response = await pyrateExternalAPIClient.put(`${service}/${serviceId}`, data);
        res.status(200).json(response.data)
    }
}
