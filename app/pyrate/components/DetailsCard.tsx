import { Card, Button, Modal } from 'antd';
import { useEffect, useState } from 'react';
import { EditTwoTone, CheckSquareTwoTone } from '@ant-design/icons';
import * as lodash from 'lodash';
import { detailsCardParams } from '../types'


export default function DetailsCard(props: detailsCardParams) {
    const { title, columnDetails, entityData, children } = props
    const [buttonTitle, setButtonTitle] = useState('Save')
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [cardTitle, setCardTitle] = useState('');

    useEffect(() => {
        setCardTitle(lodash.startCase(title))
    }, [title])

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const saveIcon = <CheckSquareTwoTone style={{ fontSize: '16px' }} />
    return (
        <div>
            <Card title={cardTitle} extra={
                <Button
                    type="primary"
                    icon={saveIcon}
                    onClick={showModal}
                >
                    {buttonTitle}
                </Button>}>
                {columnDetails && entityData && children}
            </Card>
            <Modal title={`Update ${cardTitle}`} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
        </div>


    );
}