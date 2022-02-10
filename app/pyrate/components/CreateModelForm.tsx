import { Card, Form, Space, Button, Input } from "antd";
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useState } from "react";

export default function CreateModalForm() {
    const [fields, setFields] = useState([]);

    return (
        <div>
            <Card title="Card title" bordered={false}>
                <Form name="dynamic_form_nest_item" autoComplete="off">
                    {/* <Form.List name="users">
                      {
                          
                      }
                    </Form.List> */}
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>

            </Card>
        </div >
    )
}