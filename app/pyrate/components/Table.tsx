import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    Box,
    Link,
} from "@chakra-ui/react"

export interface Data {
    [key: string]: unknown
}
export interface TableData {
    [key: string]: string | number | Data
}
export interface TableProps {
    dataSource: TableData[],
    columns: string[],
    name: string
}

export default function TableComponent(props: TableProps) {
    const { dataSource, columns, name } = props
    return (
        <Box>
            <Table variant="simple" style={{ 'color': '#5d5d5d', 'borderColor': '#5d5d5d' }}>
                <TableCaption style={{ 'color': '#5d5d5d' }}>Imperial to metric conversion factors</TableCaption>
                <Thead>
                    <Tr>
                        {columns?.map((column) => (<Th key={column}>{column}</Th>))}
                    </Tr>
                </Thead>
                <Tbody>
                    {dataSource?.map((data) => {
                        return (
                            <Tr key={data.id as string}>
                                {columns?.map((column) => {
                                    return (
                                        <Td key={column}>
                                            <Link href={`/dashboard/details/${name}/${data.id}`} style={{ textDecoration: 'none' }}>
                                                {data[column]}
                                            </Link>
                                        </Td>
                                    )
                                })}

                            </Tr>
                        )
                    })}
                </Tbody>

            </Table>
        </Box>
    )
}

