import GenericModal from './GenericModal';
import { useState } from 'react';
import { Table, Tag, Space, Button } from 'antd';
import { EditTwoTone, DeleteTwoTone } from '@ant-design/icons';
import { handleServiceDelete } from '../data/utils';
import Link from 'next/link'


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
    const extendedColumns = [...columns, 'actions']

    // States
    const [isModalVisible, setModalVisible] = useState(false)
    const [modalTitle, setModalTitle] = useState('')
    const [modalContent, setModalContent] = useState('')
    const [isModalProcessing, setModalProcessing] = useState(false)
    const [deleteError, setDeleteError] = useState(null)
    const [entityId, setEntityId] = useState('')

    // Helper Functions
    const openModalForDelete = () => {
        setModalTitle('Delete Service')
        setModalContent(`Are you sure you want to delete an item from ${serviceName}?`)
        setModalVisible(true)
    }

    const parsedColumns = extendedColumns?.map((column) => {
        return {
            title: column,
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
                            <DeleteTwoTone
                                style={{ cursor: 'pointer', fontSize: '20px' }}
                                twoToneColor='#FF0000'
                                onClick={
                                    () => {
                                        setEntityId(record.id as string);
                                        openModalForDelete()
                                    }
                                }
                            />
                        </Space>
                    )
                }
                return text
            }
        }
    })

    const addKeyToDataSource = dataSource?.map((data, index) => {
        return { ...data, key: index }
    })

    const handleDelete = async (serviceName: string, serviceId: number) => {
        setModalVisible(true)
        let response: { [key: string]: any } = {};
        try {
            setModalProcessing(true)
            response = await handleServiceDelete(serviceName, serviceId)
            setModalVisible(false)
            refetch ? refetch() : null;
            setModalProcessing(false)
        } catch (error) {
            setModalProcessing(false)
            response.error = error
        }
        return response;
    }

    return (
        <div>
            <Table columns={parsedColumns} dataSource={addKeyToDataSource} />
            <GenericModal
                okButtonProps={{
                    danger: deleteError
                }}
                handleOk={() => {
                    handleDelete(serviceName as string, Number(entityId))
                }}
                handleCancel={() => {
                    setModalVisible(false)
                }}
                visible={isModalVisible}
                title={modalTitle}
                confirmLoading={isModalProcessing}
                content={modalContent}
            />

        </div>
    )
}







