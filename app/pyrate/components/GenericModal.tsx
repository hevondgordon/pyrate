import { useState } from 'react'
import { Modal } from 'antd'

export interface GenericModalProps {
    handleOk: (...args: []) => void,
    handleCancel: (...args: []) => void,
    visible: boolean,
    title: string,
    confirmLoading: boolean,
    content: string,
    okButtonProps?: {
        [key: string]: any
    },
    footer?: any
}

export default function GenericModal(props: GenericModalProps) {
    const {
        handleOk, handleCancel,
        visible, title,
        confirmLoading, content,
        okButtonProps, footer } = props

    return (
        <Modal
            footer={footer}
            okButtonProps={okButtonProps}
            title={title}
            visible={visible}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}

        >
            <p>{content}</p>
        </Modal>
    )
}