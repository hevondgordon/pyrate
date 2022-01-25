import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import useSWR from 'swr'
import { fetcher, shouldFetch, handleServiceUpdate } from '../../../data/utils'
import { ROUTE as GET_COLUMN_DETAILS_ROUTE } from '../../api/services/getColumnDetails'
import { ROUTE as GET_SERVICE_DETAILS_ROUTE } from '../../api/services/getServiceDetails'
import DetailsCard from '../../../components/DetailsCardForm'
import { GenericData, _Column } from '../../../types'


export default function ServiceDetail() {
    const router = useRouter()
    const { details } = router.query
    const [serviceName, setServiceName] = useState('')
    const [model, setModel] = useState('')
    const [entityId, setEntityId] = useState('')
    const [readyToSave, setReadyToSave] = useState(false)

    const onSave = async (data: GenericData) => {
        await handleServiceUpdate(serviceName, Number(entityId), data)
    }
    const {
        data: columnDetails,
    } = useSWR(shouldFetch(details) ? `${GET_COLUMN_DETAILS_ROUTE}?model=${model}` : null, fetcher)
    const {
        data: entityData,
    } = useSWR(shouldFetch(details) ? `${GET_SERVICE_DETAILS_ROUTE}?model=${model}&id=${entityId}` : null, fetcher)


    useEffect(() => {
        setServiceName(details?.[0] as string)
        setModel(details?.[0] as string)
        setEntityId(details?.[1] as string)
    }, [details])

    return (
        <DetailsCard title={serviceName}
            columnDetails={columnDetails?.data?.columns as _Column[]}
            entityData={entityData}
            setReadyToSave={setReadyToSave}
            serviceName={serviceName}
            serviceId={Number(entityId)}
            columns={columnDetails?.data?.columns}
            readyToSave={readyToSave}
            onSave={onSave}
        />
    );
}
