// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { pyrateInternalAPIClient } from '../../../data/utils'

export const ROUTE = `/api/services/getColumnDetails/`

type Data = {
    name: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const { model } = req.query
    const _model = model as string;
    let response = null
    if (_model) {
        response = await pyrateInternalAPIClient.get(`__internals__/get_column_details?model=${_model}`);
        res.status(200).json(response.data)

    }
}
