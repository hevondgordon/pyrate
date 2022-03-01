import { MenuContext } from "../../../context/MenuContext"
import { useContext } from "react"
import { GenericData } from "../../../types"
import GenericTable from "../../../components/GenericTable"


export default function ConfigureModels() {
    const { menuItems } = useContext(MenuContext)
    const formatMenuItemsAsDataSource = (menuItems: string[]) => {
        return menuItems.map((item: string) => {
            return {
                name: item,
                id: item
            }
        })
    }

    const linkConstructor = (args: GenericData) => {
        return `/dashboard/configuration/${args.name}`.toLowerCase()
    }


    return (
        <div>
            <GenericTable
                columns={["name"]}
                updateLinkConstructor={linkConstructor}
                dataSource={menuItems ? formatMenuItemsAsDataSource(menuItems) : []}
                serviceName="Models" />
        </div >
    )
}