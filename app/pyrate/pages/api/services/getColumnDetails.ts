// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { pyrateAPIClient } from '../../../data/utils'
import { GenericData } from '../../../types';

export const ROUTE = `/api/services/getColumnDetails/`

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<GenericData>
) {
    const { model } = req.query
    const _model = model as string;
    let response = null
    if (_model) {
        response = await pyrateAPIClient.get(`__internals__/get_column_details?model=${_model}`);
        res.status(200).json(response.data)

    }
}
