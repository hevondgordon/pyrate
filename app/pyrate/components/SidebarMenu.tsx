import { useEffect, useState } from 'react';
import { Menu, Button, Divider } from 'antd';
import { FolderOpenTwoTone, HomeTwoTone, PlusSquareTwoTone } from '@ant-design/icons';
import Link from 'next/link'
import { useRouter } from 'next/router'
import * as lodash from 'lodash';
export interface MenuProps {
    services: string[]
}
export default function SidebarMenu(props: MenuProps) {
    const router = useRouter()
    const { serviceName, details } = router.query
    const { services } = props
    const [selectedDefault, setSelectedDefault] = useState(['home'])
    useEffect(() => {
        if (serviceName) {
            setSelectedDefault([serviceName as string])
        }
        else if (details) {
            setSelectedDefault([details[0] as string])
        } else {
            setSelectedDefault(['home'])
        }
    }, [serviceName, details])

    return (
        <Menu
            selectedKeys={selectedDefault}
            theme='light'

        >
            <Menu.Item key={'new-model'} icon={<PlusSquareTwoTone twoToneColor='lightgreen' style={{ fontSize: '16px' }} />}>
                <Link href={`/dashboard/model/create/`} passHref>
                    Create Model
                </Link>
            </Menu.Item>
            <Divider />

            {services?.map((service: string) => {
                return (
                    <Menu.Item key={service} icon={<FolderOpenTwoTone />}>
                        <Link href={`/dashboard/${service}/`}>{lodash.startCase(service)}</Link>
                    </Menu.Item>
                )
            })}
        </Menu>
    )
}
