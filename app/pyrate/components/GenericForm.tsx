import { Form, Input, InputNumber, Row, Col } from 'antd';
import { _Column } from '../types';

export interface Field {
    label: string;
    type: string;

}
export interface GenericFormProps {
    columns: _Column[];
}

const generateColumnsAsFields = (columns: _Column[]) => {
    return columns?.map((column, index) => {
        return (
            <Col span={12} key={index}>
                <Form.Item
                    name={column.name}
                    label={column.name}
                    rules={[
                        {
                            required: !!column.other_options?.nullable,
                            message: column.name,
                        },
                    ]}
                >
                    <Input placeholder={column.name} />
                </Form.Item>
            </Col>
        )
    })
}

export default function GenericForm(props: GenericFormProps) {
    const [form] = Form.useForm();
    const { columns } = props;

    return (
        <div>
            <Form
                form={form}
                name="generic_form"
            >
                <Row gutter={16}>
                    {generateColumnsAsFields(columns)}
                </Row>
            </Form>

        </div>
    )

}

// default function 