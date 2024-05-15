export class Id {
    static generateUniqueId() : string {
        return Math.random().toString(16).slice(2)
    }
}