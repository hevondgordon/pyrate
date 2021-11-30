import { useRouter } from 'next/router'
import { ROUTE as GET_SERVICE_ROUTE } from '../api/services/[serviceType]'
import { ROUTE as GET_COLUMN_DETAILS } from '../api/services/getColumnDetails'
import { fetcher, handleServiceDelete } from '../../data/utils'
import { _Column } from "../../types";
import GenericTable from "../../components/GenericTable";
import useSWR from 'swr'


export default function DashboardContent() {
    const router = useRouter()
    const { serviceName } = router.query
    const {
        data: tableData,
        mutate: refetchServices
    } = useSWR(GET_SERVICE_ROUTE(serviceName as string), fetcher)

    const {
        data: columnDetails,
    } = useSWR(`${GET_COLUMN_DETAILS}?model=${serviceName}`, fetcher)

    const columnTitles: string[] = columnDetails?.data?.columns.map((column: _Column) => column.name);

    return (
        <div>
            <GenericTable
                refetch={refetchServices}
                columns={columnTitles}
                dataSource={tableData}
                serviceName={serviceName as string} />
        </div>
    )
}



