export interface _Column {
    model: string,
    name: string,
    type: string,
    other_options: {
        [key: string]: unknown
    }
}

export interface GenericFormProps {
    columns: _Column[];
    data: {
        [key: string]: unknown
    }
}

export interface GenericData {
    [key: string]: unknown
}

export interface detailsCardParams {
    title: string
    columnDetails: GenericData[]
    entityData: {
        [key: string]: unknown
    }
    children?: React.ReactNode
    onUpdate?: (data: GenericData) => void
}

export interface UpdateAndDeleteButtonParams {
    serviceName: string
    recordId: number
    fetcher?: Function
}