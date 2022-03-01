import { useEffect, useState, useContext } from 'react';
import { Menu, Button, Divider } from 'antd';
import { FolderOpenTwoTone, HomeTwoTone, PlusSquareTwoTone } from '@ant-design/icons';
import Link from 'next/link'
import { useRouter } from 'next/router'
import * as lodash from 'lodash';
import { MenuContext } from '../context/MenuContext';
export interface MenuProps {
    services: string[]
}
export default function SidebarMenu() {
    const router = useRouter()
    const { serviceName, details } = router.query
    const [selectedDefault, setSelectedDefault] = useState(['home'])
    const { menuItems } = useContext(MenuContext)

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
            <Menu.Item
                key={'new-model'}
                icon={<PlusSquareTwoTone
                    twoToneColor='lightgreen'
                    style={{ fontSize: '16px' }} />
                }>
                <Link href={`/dashboard/model/create/`} passHref>
                    Create Model
                </Link>
            </Menu.Item>

            <Menu.Item
                key={'configuration'}
                icon={<PlusSquareTwoTone
                    twoToneColor='lightgreen'
                    style={{ fontSize: '16px' }} />
                }>
                <Link href={`/dashboard/configuration/`} passHref>
                    Model Configuration
                </Link>
            </Menu.Item>
            <Divider />

            {menuItems?.map((service: string) => {
                return (
                    <Menu.Item key={service} icon={<FolderOpenTwoTone />}>
                        <Link href={`/dashboard/${service}/`}>{lodash.startCase(service)}</Link>
                    </Menu.Item>
                )
            })}
        </Menu>
    )
}
