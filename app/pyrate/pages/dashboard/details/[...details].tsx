import { useRouter } from 'next/router'
import useSWR from 'swr'


export default function EntityDetail() {
    const router = useRouter()
    const { entity, id } = router.query

    return (<div>{`${JSON.stringify(router.query, null, 4)}`}</div>);
}