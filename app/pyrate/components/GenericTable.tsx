import { Table, Space, Popconfirm } from 'antd';
import { EditTwoTone, DeleteTwoTone } from '@ant-design/icons';
import Link from 'next/link'
import * as lodash from 'lodash';
import { GenericData, TableProps, UpdateAndDeleteButtonParams } from '../types';
import { GENERIC_TABLE_UPDATE_AND_DELETE } from '../data/constants';

const UpdateAndDeleteButtons = (props: UpdateAndDeleteButtonParams) => {

    const { deleteAction, callbackArgs, serviceName, updateLinkConstructor } = props;
    return (
        <Space size="middle">
            {updateLinkConstructor && <Link href={updateLinkConstructor(callbackArgs, serviceName)}>
                <a>
                    <EditTwoTone twoToneColor="#77D970" style={{ fontSize: '20px' }} />
                </a>
            </Link>
            }

            {deleteAction && <Popconfirm
                icon={<DeleteTwoTone twoToneColor='red' />}
                placement="bottom"
                title={`Confirm Delete ${serviceName} record`}
                onConfirm={async () => {
                    await deleteAction(callbackArgs)
                }}
                okText="Yes"
                cancelText="No"
            >
                <DeleteTwoTone
                    style={{ cursor: 'pointer', fontSize: '20px' }}
                    twoToneColor='#FF0000'
                />
            </Popconfirm>}

        </Space>
    )
}

export default function GenericTable(props: TableProps) {
    const { dataSource, columns, serviceName, deleteAction, updateLinkConstructor } = props
    const extendedColumns = columns?.length > 0 ? [...columns, GENERIC_TABLE_UPDATE_AND_DELETE] : columns

    const parsedColumns = extendedColumns?.map((column) => {
        return {
            title: lodash.startCase(column),
            dataIndex: column,
            key: column,
            render: (text: string, record: GenericData) => {
                if (column === GENERIC_TABLE_UPDATE_AND_DELETE) {
                    return <UpdateAndDeleteButtons
                        updateLinkConstructor={updateLinkConstructor}
                        deleteAction={deleteAction}
                        serviceName={serviceName}
                        callbackArgs={record}
                    />
                }
                return text
            }
        }
    })

    const dataSourceWithKeys = dataSource?.map((data, index) => {
        return { ...data, key: index }
    })

    return <Table columns={parsedColumns} dataSource={dataSourceWithKeys} />
}







