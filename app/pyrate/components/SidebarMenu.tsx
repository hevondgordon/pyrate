import { ReactNode, ReactText, useEffect, useState } from 'react';
import { Menu } from 'antd';
import { FolderOpenTwoTone, HomeTwoTone } from '@ant-design/icons';
import Link from 'next/link'
import { useRouter } from 'next/router'
import { toTitleCase } from '../data/utils';
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

        >    <Menu.Item key={'home'} icon={<HomeTwoTone />}>
                <Link href={`/dashboard/`}>Home</Link>
            </Menu.Item>
            {services?.map((service: string) => {
                return (
                    <Menu.Item key={service} icon={<FolderOpenTwoTone />}>
                        <Link href={`/dashboard/${service}/`}>{toTitleCase(service)}</Link>
                    </Menu.Item>
                )
            })}
        </Menu>
    )
}
