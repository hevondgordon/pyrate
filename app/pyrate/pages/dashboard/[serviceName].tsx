import { useRouter } from 'next/router'
import { ROUTE as GET_SERVICE_ROUTE } from '../api/services/[serviceType]'
import { ROUTE as GET_COLUMN_DETAILS } from '../api/services/getColumnDetails'
import { fetcher, handleServiceDelete, handleServiceItemDelete } from '../../data/utils'
import { GenericData, _Column } from "../../types";
import GenericTable from "../../components/GenericTable";
import SettingsIcon from '../../components/SettingsIcon';
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

    const onDeleteService = async () => {
        await handleServiceDelete(serviceName as string)
    }

    const onDeleteServiceItem = async (args: GenericData) => {
        await handleServiceItemDelete(serviceName, args.id)
        await refetchServices()
    }

    const updatePageLinkConstructor = (args: GenericData) => {
        return `/dashboard/details/${serviceName}/${args.id}`
    }

    return (
        <div>
            <SettingsIcon onMenuItemSelected={onDeleteService}></SettingsIcon>
            <GenericTable
                updateLinkConstructor={updatePageLinkConstructor}
                deleteAction={onDeleteServiceItem}
                columns={columnTitles}
                dataSource={tableData}
                serviceName={serviceName as string} />
        </div>

    )
}



