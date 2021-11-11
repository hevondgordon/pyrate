// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { pyrateExternalAPIClient } from '../../../data/utils'

export const ROUTE = (serviceType: string) => {
    return `/api/services/${serviceType}/`
}

type Data = {
    name: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const { serviceType } = req.query
    const _serviceType = serviceType as string;

    if (_serviceType.toLowerCase() !== 'home') {
        const _serviceType = serviceType as string
        const response = await pyrateExternalAPIClient.get(serviceType as string);
        res.status(200).json(response.data)
    } else {
        res.status(200).json({
            name: 'Home'
        })
    }
}
