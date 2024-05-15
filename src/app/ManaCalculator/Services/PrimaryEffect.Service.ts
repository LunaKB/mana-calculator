import { Observable } from "rxjs"
import { Service } from "./Service"

export class PrimaryEffectService extends Service {
    override getUrl(): string {
        return 'primary-effects'
    }

    getAll() : Observable<any> {
        return this.http.get(this.getBaseUrl())
    }
}