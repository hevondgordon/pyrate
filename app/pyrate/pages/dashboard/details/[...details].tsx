import { useRouter } from 'next/router'
import useSWR from 'swr'
import { Box } from "@chakra-ui/react";

export default function EntityDetail() {
    const router = useRouter()
    const { entity, id } = router.query

    return (<Box>{`${JSON.stringify(router.query, null, 4)}`}</Box>);
}