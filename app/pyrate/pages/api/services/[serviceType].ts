// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { pyrateAPIClient } from '../../../data/utils'
import { GenericData } from '../../../types'

export const ROUTE = (serviceType: string) => {
    return `/api/services/${serviceType}/`
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<GenericData>
) {
    const { serviceType } = req.query
    const _serviceType = serviceType as string;

    if (_serviceType.toLowerCase() !== 'home') {
        const response = await pyrateAPIClient.get(_serviceType);
        res.status(200).json(response.data)
    } else {
        res.status(200).json({
            name: 'Home'
        })
    }
}
