import { useRouter } from "next/router"
import { ROUTE as GET_COLUMN_DETAILS } from '../../api/services/getColumnDetails'
import { fetcher } from "../../../data/utils"
import useSWR from "swr"

export default function ServiceConfiguration() {

    const router = useRouter()
    const { model } = router.query

    const {
        data: columnDetails,
    } = useSWR(`${GET_COLUMN_DETAILS}?model=${model}`, fetcher)
    console.log(columnDetails)
    return (
        <div>{model}</div>
    )
}