import { Card, Button, Popconfirm } from 'antd';
import { useEffect, useState } from 'react';
import { CheckSquareTwoTone, SaveTwoTone } from '@ant-design/icons';
import * as lodash from 'lodash';
import { DetailsCardParams } from '../types'
import GenericForm from './GenericForm';


export default function DetailsCardForm(props: DetailsCardParams) {
    const {
        title,
        columnDetails,
        entityData,
        onSave
    } = props

    const [buttonTitle, setButtonTitle] = useState('Save')
    const [cardTitle, setCardTitle] = useState('');
    const [readyToSave, setReadyToSave] = useState(false);

    useEffect(() => {
        setCardTitle(lodash.startCase(title))
    }, [title])

    const saveIcon = <CheckSquareTwoTone style={{ fontSize: '16px' }} />
    return (
        <div>
            <Card title={cardTitle} extra={
                <Popconfirm
                    icon={<SaveTwoTone />}
                    placement="bottom"
                    title={`update ${cardTitle.toLowerCase()}?`}
                    onConfirm={() => {
                        setReadyToSave(true)
                    }}
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
                {columnDetails && entityData && <GenericForm
                    data={entityData}
                    columns={columnDetails}
                    setReadyToSave={setReadyToSave}
                    readyToSave={readyToSave}
                    onSave={onSave}
                />}
            </Card >


        </div >
    );
}