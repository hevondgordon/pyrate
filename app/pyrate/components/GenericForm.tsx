import { Form, Input, InputNumber, Row, Col } from 'antd';
import { _Column } from '../types';
import * as lodash from 'lodash';

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
                    label={lodash.startCase(column.name)}
                    rules={[
                        {
                            required: !!column.other_options?.nullable,
                            message: column.name,
                        },
                    ]}
                >
                    <Input placeholder={lodash.startCase(column.name).toLowerCase()} />
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
                layout="vertical"
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