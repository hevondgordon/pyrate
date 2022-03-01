import { Form, Input, InputNumber, Row, Col, Button } from 'antd';
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
        return (
            <Col span={12} key={index}>
                <Form.Item
                    name={column.name}
                    label={lodash.startCase(column.name)}
                >
                    <Input />
                </Form.Item>
            </Col>
        )
    })
}

export default function GenericForm(props: GenericFormProps) {
    const [form] = Form.useForm();
    const { columns, data, readyToSave, onSave, setReadyToSave } = props;

    if (readyToSave) {
        onSave ? onSave(form.getFieldsValue()) : null;
        setReadyToSave ? setReadyToSave(false) : null; // reset the readyToSave state
    }

    return (
        <div>
            <Form
                initialValues={data}
                onValuesChange={(changedValues, allValues) => {
                    console.log(changedValues, allValues)
                }}
                layout="vertical"
                form={form}
                name="generic_form"
            >

                <Row gutter={16}>
                    {data && columns && generateColumnsAsFields(columns, data)}

                </Row>

            </Form>

        </div >
    )

}