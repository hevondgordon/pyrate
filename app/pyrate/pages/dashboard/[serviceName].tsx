import BasicTable from "../../components/BasicTable";
import GenericModal from "../../components/GenericModal";
import { useState } from 'react'
import { useRouter } from 'next/router'
import { ROUTE as GET_SERVICE_ROUTE } from '../api/services/[serviceType]'
import { ROUTE as DELETE_SERVICE_ROUTE } from '../api/services/delete'
import { fetcher, handleServiceDelete } from '../../data/utils'
import useSWR from 'swr'


const getTableColumns = (services: any) => {
    let tableColumns: string[] = [];
    const service = services?.[0];

    if (service) {
        tableColumns = Object.keys(service)
    }
    return tableColumns;
}

export default function DashboardContent() {
    const router = useRouter()
    const { serviceName } = router.query
    const { data, error } = useSWR(GET_SERVICE_ROUTE(serviceName as string), fetcher)
    const tableColumns = getTableColumns(data)

    return (
        <div>
            <BasicTable
                columns={tableColumns}
                dataSource={data}
                serviceName={serviceName as string} />
        </div>
    )
}