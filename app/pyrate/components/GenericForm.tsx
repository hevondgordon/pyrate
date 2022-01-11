import { Form, Input, InputNumber, Row, Col } from 'antd';
import { useState, useEffect } from 'react';
import {
    _Column, GenericFormProps, GenericData
} from '../types';
import * as lodash from 'lodash';

export interface Field {
    label: string;
    type: string;

}


const generateColumnsAsFields = (columns: _Column[], data: GenericData) => {
    return columns?.map((column, index) => {
        console.log('the data is that ->', data ? data[column.name] : null);

        return (
            <Col span={12} key={index}>
                <Form.Item

                    label={lodash.startCase(column.name)}
                    rules={[
                        {
                            required: !!column.other_options?.nullable,
                            message: column.name,
                        },
                    ]}
                >
                    <Input
                        value={data?.[column.name] as string}
                        placeholder={data ? data[column.name] as string : 'empty'} />
                </Form.Item>
            </Col>
        )
    })
}

export default function GenericForm(props: GenericFormProps) {
    const [form] = Form.useForm();
    const { columns, data } = props;

    return (
        <div>
            <Form
                layout="vertical"
                form={form}
                name="generic_form"
            >
                <Row gutter={16}>
                    {data && columns && generateColumnsAsFields(columns, data)}
                </Row>
            </Form>

        </div>
    )

}