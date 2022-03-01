import { Dispatch, SetStateAction } from "react";

export interface IMenuProviderContext {
    menuItems: string[];
    setMenuItems: Dispatch<SetStateAction<string[]>>;
}

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

export interface TableData {
    [key: string]: string | number | GenericData
}
export interface TableProps {
    dataSource: TableData[],
    columns: string[],
    serviceName: string
    deleteAction?: (data: GenericData) => Promise<void>
    updateLinkConstructor?: (data: GenericData, ...extra: unknown[]) => string
    refetch?: () => void
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
    callbackArgs: GenericData
    deleteAction?: (args: GenericData) => void
    updateLinkConstructor?: (args: GenericData, ...extra: unknown[]) => string
}