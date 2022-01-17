import { Card, Button, Modal, Popconfirm } from 'antd';
import { useEffect, useState } from 'react';
import { EditTwoTone, CheckSquareTwoTone, SaveTwoTone } from '@ant-design/icons';
import * as lodash from 'lodash';
import { detailsCardParams } from '../types'


export default function DetailsCard(props: detailsCardParams) {
    const { title, columnDetails, entityData, children } = props
    const [buttonTitle, setButtonTitle] = useState('Save')
    const [cardTitle, setCardTitle] = useState('');

    useEffect(() => {
        setCardTitle(lodash.startCase(title))
    }, [title])

    const updateModel = () => {
        console.log('update model')
    }
    const saveIcon = <CheckSquareTwoTone style={{ fontSize: '16px' }} />
    return (
        <div>
            <Card title={cardTitle} extra={
                <Popconfirm
                    icon={<SaveTwoTone />}
                    placement="bottom"
                    title={`update ${cardTitle.toLowerCase()}?`}
                    onConfirm={updateModel}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button
                        type="primary"
                        icon={saveIcon}
                    >
                        {buttonTitle}
                    </Button>
                </Popconfirm>
            }>
                {columnDetails && entityData && children}
            </Card>


        </div>
    );
}