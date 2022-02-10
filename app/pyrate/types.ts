import { Dispatch, SetStateAction } from "react";

export interface _Column {
    model?: string,
    name?: string,
    type?: string,

}

export interface SettingsIconParams {
    onMenuItemSelected: (selectedMenuItem: string) => void,
}

export interface GenericFormProps {
    columns: _Column[];
    data: {
        [key: string]: unknown
    }
    onSave?: Function;
    readyToSave?: boolean;
    serviceName?: string
    serviceId?: number
    setReadyToSave?: Dispatch<SetStateAction<boolean>>;
}

export interface GenericData {
    [key: string]: unknown
}

export interface DetailsCardParams {
    title: string
    columnDetails: _Column[]
    entityData: {
        [key: string]: unknown
    }
    serviceName?: string
    serviceId?: number
    columns?: _Column[]
    children?: React.ReactNode
    readyToSave?: boolean
    onSave?: (data: GenericData) => void
    onUpdate?: (data: GenericData) => void
    setReadyToSave?: Dispatch<SetStateAction<boolean>>
}

export interface UpdateAndDeleteButtonParams {
    serviceName: string
    recordId: number
    fetcher?: Function
}