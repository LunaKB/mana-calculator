import { Observable } from "rxjs"
import { Service } from "./Service"

export class AffinityConflictService extends Service {
    override getUrl(): string {
        return 'affinity-conflicts'
    }

    getAll() : Observable<any> {
        return this.http.get(this.getBaseUrl())
    }
}