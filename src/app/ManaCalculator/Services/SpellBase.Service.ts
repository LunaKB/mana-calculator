import { Observable } from "rxjs"
import { Service } from "./Service"

export class SpellBaseService extends Service {
    override getUrl(): string {
        return 'spell-bases'
    }

    getAll() : Observable<any> {
        return this.http.get(this.getBaseUrl())
    }    
}