import { useRouter } from 'next/router'
import { fetcher } from '../../../data/utils'
import { ROUTE as GET_COLUMN_DETAILS } from '../../api/services/getColumnDetails'
import { Card } from 'antd';
import useSWR from 'swr'
import GenericForm from '../../../components/GenericForm'


export default function EntityDetail() {
    const router = useRouter()
    const { entity, id, details } = router.query
    const {
        data: columnDetails,
    } = useSWR(`${GET_COLUMN_DETAILS}?model=${details?.[0]}`, fetcher)

    return (
        <Card title="Default size card" extra={<a href="#">More</a>}>
            <GenericForm
                columns={columnDetails?.data?.columns}
            />
        </Card>

    );
}