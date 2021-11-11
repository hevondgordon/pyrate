import TableComponent from "../../components/Table";
import { useRouter } from 'next/router'
import { ROUTE as GET_SERVICE_ROUTE } from '../api/services/[serviceType]'
import useSWR from 'swr'
import { fetcher } from '../../data/utils'

export default function DashboardContent() {
    const router = useRouter()
    const { id } = router.query
    const { data, error } = useSWR(GET_SERVICE_ROUTE(id as string), fetcher)

    return (
        <div>
            <TableComponent />
        </div>
    );
}