import React, { ReactNode } from 'react';
import { Drawer, Row, Col } from 'antd';
import { appName } from '../data/constants'
import SidebarMenu from './SidebarMenu';
import { MenuContextProvider } from '../context/MenuContext';



export default function LocalSideBarLayout({ children }: { children: ReactNode }) {
    return (
        <MenuContextProvider>
            <Row gutter={2} style={{ background: '#F5F5F5', height: '100vh' }}>
                <Col span={4} >
                    <Drawer mask={false} title={appName} placement="left" visible={true} closable={false}>
                        <SidebarMenu />
                    </Drawer>
                </Col>
                <Col span={19}>
                    {children}
                </Col>
            </Row>
        </MenuContextProvider>)

}
