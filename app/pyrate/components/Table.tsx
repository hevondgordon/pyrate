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
} from "@chakra-ui/react"

export interface TableProps {
    dataSource: unknown[],
    columns: unknown[],
}

export default function TableComponent(props: TableProps) {
    return (
        <Box>
        <Table variant="simple" style={{'color': '#5d5d5d', 'borderColor': '#5d5d5d'}}>
            <TableCaption style={{'color': '#5d5d5d'}}>Imperial to metric conversion factors</TableCaption>
            <Thead>
                <Tr>
                    <Th>To convert</Th>
                    <Th>into</Th>
                    <Th isNumeric>multiply by</Th>
                </Tr>
            </Thead>
            <Tbody>
                <Tr>
                    <Td>inches</Td>
                    <Td>millimetres (mm)</Td>
                    <Td isNumeric>25.4</Td>
                </Tr>
                <Tr>
                    <Td>feet</Td>
                    <Td>centimetres (cm)</Td>
                    <Td isNumeric>30.48</Td>
                </Tr>
                <Tr>
                    <Td>yards</Td>
                    <Td>metres (m)</Td>
                    <Td isNumeric>0.91444</Td>
                </Tr>
            </Tbody>
            
        </Table>
        </Box>
    )
}
