import TableComponent from "../../components/Table";
import { useRouter } from 'next/router'
import { ROUTE as GET_SERVICE_ROUTE } from '../api/services/[serviceType]'
import useSWR from 'swr'
import { fetcher } from '../../data/utils'
import { Box } from "@chakra-ui/react";

export default function DashboardContent() {
    const router = useRouter()
    const { id } = router.query
    const { data, error } = useSWR(GET_SERVICE_ROUTE(id as string), fetcher)

    let tableColumns: string[] = [];

    if (data?.[0]) {
        tableColumns = Object.keys(data?.[0])
    }
    const homeComponent = <Box>{'this is the home bro'}</Box>
    const tableComponent = <TableComponent
        columns={tableColumns}
        dataSource={data}
        name={id as string} />
    let renderComponent: JSX.Element;
    id === 'home' ? renderComponent = homeComponent : renderComponent = tableComponent
    return renderComponent;
}