import GenericModal from './GenericModal';
import { useState } from 'react';
import { Table, Tag, Space, Button, Popconfirm } from 'antd';
import { EditTwoTone, DeleteTwoTone } from '@ant-design/icons';
import { handleServiceDelete } from '../data/utils';
import Link from 'next/link'
import * as lodash from 'lodash';

export interface Data {
    [key: string]: unknown
}

export interface TableData {
    [key: string]: string | number | Data
}

export interface TableProps {
    dataSource: TableData[],
    columns: string[],
    serviceName: string
    deleteAction?: () => void
    refetch?: () => void
}

export default function GenericTable(props: TableProps) {
    const { dataSource, columns, serviceName, refetch } = props
    const extendedColumns = columns?.length > 0 ? [...columns, 'actions'] : []



    const parsedColumns = extendedColumns?.map((column) => {
        return {
            title: lodash.startCase(column),
            dataIndex: column,
            key: column,
            render: (text: string, record: Data) => {
                if (column === 'actions') {
                    return (
                        <Space size="middle">
                            <Link href={`/dashboard/details/${serviceName}/${record.id}`}>
                                <a>
                                    <EditTwoTone twoToneColor="#77D970" style={{ fontSize: '20px' }} />
                                </a>
                            </Link>

                            <Popconfirm
                                icon={<DeleteTwoTone twoToneColor='red' />}
                                placement="bottom"
                                title={`delete ${lodash.startCase(serviceName).toLowerCase()} with id ${record.id}?`}
                                onConfirm={async () => { await handleDelete(serviceName, record.id as number) }}
                                okText="Yes"
                                cancelText="No"
                            >
                                <DeleteTwoTone
                                    style={{ cursor: 'pointer', fontSize: '20px' }}
                                    twoToneColor='#FF0000'
                                />
                            </Popconfirm>

                        </Space>
                    )
                }
                return text
            }
        }
    })

    const dataSourceWithKeys = dataSource?.map((data, index) => {
        return { ...data, key: index }
    })

    const handleDelete = async (serviceName: string, serviceId: number) => {
        let response: { [key: string]: any } = {};
        try {
            response = await handleServiceDelete(serviceName, serviceId)
            refetch ? refetch() : null;
        } catch (error) {
            response.error = error
        }
        return response;
    }

    return (
        <div>
            <Table columns={parsedColumns} dataSource={dataSourceWithKeys} />


        </div>
    )
}







