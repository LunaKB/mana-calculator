import { List } from "./List";

export class ArrayList<Type> extends List<Type> {
    constructor(...values: Type[]) {
        super(...values)
    }

    override getItemById(id: number): Type {
        throw new Error("Method not implemented.");
    }
    
    override getItemByUUID(uuid: string): Type {
        throw new Error("Method not implemented.");
    }
    
    override getItemByName(name: string): Type {
        throw new Error("Method not implemented.");
    }
}