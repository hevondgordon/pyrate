// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { pyrateExternalAPIClient } from '../../../data/utils'
import { GenericData } from '../../../types';

export const ROUTE = `/api/services/delete/`;

type Data = {
    name: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<GenericData>
) {
    const { service, serviceId } = req.query

    console.log('this is the api that is 404ing')


    const response = await pyrateExternalAPIClient.delete(`${service}/${serviceId}`);
    res.status(200).json(response.data)

}