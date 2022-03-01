import { useRouter } from "next/router"

export default function ServiceConfiguration() {

    const router = useRouter()
    const { model } = router.query
    return (
        <div>{model}</div>
    )
}