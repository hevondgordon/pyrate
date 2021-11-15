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
}

export default function BasicTable(props: TableProps) {
    const { dataSource, columns, serviceName } = props
    const extendedColumns = [...columns, 'actions']

    // States
    const [isModalVisible, setModalVisible] = useState(false)
    const [modalTitle, setModalTitle] = useState('')
    const [modalContent, setModalContent] = useState('')
    const [isModalProcessing, setModalProcessing] = useState(false)
    const [deleteError, setDeleteError] = useState(null)

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
                                onClick={() => openModalForDelete()}
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
        setModalProcessing(true)
        let response;
        try {
            response = await handleServiceDelete(serviceName, serviceId)
            setModalProcessing(false)
        } catch (error) {

        }
        return response;
    }

    return (
        <div>
            <Table columns={parsedColumns} dataSource={addKeyToDataSource} />
            <GenericModal
                // footer={
                //     [
                //         <Button key="back" onClick={async () => {
                //             await handleDelete(serviceName as string, 1)
                //         }}>
                //             Return
                //         </Button>,
                //         <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
                //             Submit
                //         </Button>,
                //     ]}
                okButtonProps={{
                    danger: deleteError
                }}
                handleOk={() => {
                    handleDelete(serviceName as string, 1)
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







