import { Form, Input, InputNumber, Row, Col } from 'antd';

export interface Field {
    label: string;
    type: string;

}
export interface GenericFormProps {
    fields: Field[];
}
export default function GenericForm(props: GenericFormProps) {
    return (
        <div>
            <Row gutter={16}>
                <Col className="gutter-row" span={12}>
                    <label>this is the label</label>
                    <Input placeholder="placeholder" />
                </Col>
                <Col className="gutter-row" span={12}>
                    <label>this is the label</label>
                    <Input placeholder="placeholder" />
                </Col>
            </Row>
        </div>
    )

}