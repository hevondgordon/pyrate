import React, { ReactNode, ReactText, useState } from 'react';
import { Drawer, Button, Row, Col, Menu } from 'antd';
import { PieChartOutlined, HomeTwoTone } from '@ant-design/icons';
import SidebarMenu from './SidebarMenu';

import { appName } from '../data/constants'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ROUTE as GET_SERVICES_ROUTE } from '../pages/api/services/index';
import useSWR from 'swr'
import { fetcher } from '../data/utils'


export default function LocalSideBarLayout({ children }: { children: ReactNode }) {
    const [activeKey, setActiveKey] = useState(['Home']);
    const { data: services, error } = useSWR(GET_SERVICES_ROUTE, fetcher)
    const router = useRouter()
    const { page } = router.query

    const selectEntity = (activeKey: string | string[]) => {
        if (typeof activeKey === 'string') {
            setActiveKey([activeKey])
        } else if (Array.isArray(activeKey)) {
            setActiveKey(activeKey)
        }
    }
    return (
        <Row gutter={2}>
            <Col span={4}>
                <Drawer mask={false} title={appName} placement="left" visible={true} closable={false}>
                    <SidebarMenu services={services} />
                </Drawer>
            </Col>
            <Col span={19}>
                <div style={{ 'height': '5px' }}></div>
                {children}
            </Col>
        </Row>)

}

interface NavItemProps {
    children: ReactText;
    currentPage: string;
    key: string | number;
    onClickHandler?: (args: string | string[]) => void;
}

const NavItem = ({ children, currentPage, key, onClickHandler }: NavItemProps) => {
    const label = children.toString().toLowerCase();
    const isActive = label === currentPage;
    const onClick = () => {
        if (onClickHandler) {
            return onClickHandler(key as string)
        }
    }
    return (
        //set text center
        <Menu.Item key={'Home'} icon={<PieChartOutlined />} onClick={() => onClick()}>
            <Link href={`/dashboard/${label}/`}>{children}</Link>
        </Menu.Item>

    );
};


