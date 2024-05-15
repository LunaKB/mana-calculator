import { Observable } from "rxjs"
import { Service } from "./Service"

export class SpellLevelService extends Service {
    override getUrl(): string {
        return 'spell-levels'
    }

    getAll() : Observable<any> {
        return this.http.get(this.getBaseUrl())
    }    
}