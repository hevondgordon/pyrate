import { useRouter } from 'next/router'
import { Card } from 'antd';
import useSWR from 'swr'
import GenericForm from '../../../components/GenericForm'

export default function EntityDetail() {
    const router = useRouter()
    const { entity, id } = router.query

    return (
        <Card title="Default size card" extra={<a href="#">More</a>}>
            <GenericForm fields={[{ label: 'this is the label', type: 'this is the type' }]} />
        </Card>
    );
}