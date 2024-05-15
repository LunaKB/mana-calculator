export abstract class List<Type> {
    protected array: Array<Type>

    constructor(...values: Type[]) {
        this.array = new Array<Type>()
        if (values)
            this.array = this.array.concat(values)
    }

    abstract getItemById(id: number) : Type
    abstract getItemByUUID(uuid: string) : Type
    abstract getItemByName(name: string) : Type

    getItems() : Array<Type> {
        return this.array
    }

    length() : number {
        return this.array.length
    }

    get(index: number) {
        return this.array[index]
    }

    add(item: Type) {
        this.array.push(item)
    }

    replace(item: Type) {
        var index = this.array.indexOf(item)
        if (index < 0)
            this.array.push(item)
        else 
            this.array.splice(index, 1, item)
    }

    set(index: number, item: Type) {
        this.array.splice(index, 0,  item)
    }

    addAll(...values: Type[]) {
        this.array = this.array.concat(values)
    }

    removeAtIndex(index: number) {
        this.array.splice(index, 1)
    }

    remove(item: Type) : boolean {
        var position = this.array.findIndex(element => element == item)
        if (position > -1) {
            this.removeAtIndex(position)
            return true
        }
        return false
    }

    clear() {
        this.array.splice(0, this.array.length)
    }

    indexOf(item: Type) : number {
        return this.array.indexOf(item)
    }

    exists(item: Type) : boolean {
        return this.array.some(element => element == item)
    }

    isEmpty() : boolean {
        return this.array.length == 0
    }
}