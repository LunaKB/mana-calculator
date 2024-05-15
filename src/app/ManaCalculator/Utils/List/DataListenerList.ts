import { DataListener } from "../../Services/Data/DataListener";
import { List } from "./List";

export class DataListenerList extends List<DataListener> {
    getItem(listener: DataListener) {
        
    }

    override getItemById(id: number): DataListener {
        throw new Error("Method not implemented.");
    }
    override getItemByUUID(uuid: string): DataListener {
        throw new Error("Method not implemented.");
    }
    override getItemByName(name: string): DataListener {
        throw new Error("Method not implemented.");
    }
}