import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import useSWR from 'swr'
import { fetcher, shouldFetch } from '../../../data/utils'
import { ROUTE as GET_COLUMN_DETAILS_ROUTE } from '../../api/services/getColumnDetails'
import { ROUTE as GET_SERVICE_DETAILS_ROUTE } from '../../api/services/getServiceDetails'
import GenericForm from '../../../components/GenericForm'
import DetailsCard from '../../../components/DetailsCard'
import { GenericData } from '../../../types'


export default function ServiceDetail() {
    const router = useRouter()
    const { details } = router.query
    const [serviceName, setServiceName] = useState('')
    const [model, setModel] = useState('')
    const [entityId, setEntityId] = useState('')
    const {
        data: columnDetails,
    } = useSWR(shouldFetch(details) ? `${GET_COLUMN_DETAILS_ROUTE}?model=${model}` : null, fetcher)
    const {
        data: entityData,
    } = useSWR(shouldFetch(details) ? `${GET_SERVICE_DETAILS_ROUTE}?model=${model}&id=${entityId}` : null, fetcher)

    const updateService = (data: GenericData) => {

    }

    useEffect(() => {
        setServiceName(details?.[0] as string)
        setModel(details?.[0] as string)
        setEntityId(details?.[1] as string)
    }, [details])

    return (
        <DetailsCard title={serviceName} columnDetails={columnDetails?.data?.columns} entityData={entityData}>
            {columnDetails && entityData && <GenericForm
                data={entityData?.[0]}
                columns={columnDetails?.data?.columns}
            />}
        </DetailsCard>

    );
}
