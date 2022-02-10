import { Button, Col, Row, Menu, Dropdown } from "antd";
import { SettingOutlined, DeleteOutlined } from "@ant-design/icons"
import { SettingsIconParams } from "../types";

export default function SettingsIcon(props: SettingsIconParams) {

    const { onMenuItemSelected } = props;
    const menu = (
        <Menu onClick={async (e) => { await onMenuItemSelected(e.key) }}>
            <Menu.Item
                style={{ color: "red", borderColor: 'red' }}
                key="delete"
                icon={<DeleteOutlined />}>
                Delete Model
            </Menu.Item>

        </Menu>
    );
    return (
        <Row style={{ margin: "10px" }}>
            <Col span={1}>
                <Dropdown overlay={menu}>
                    <Button><SettingOutlined /></Button>
                </Dropdown>

            </Col>
            <Col span={23}></Col>
        </Row>
    )
}