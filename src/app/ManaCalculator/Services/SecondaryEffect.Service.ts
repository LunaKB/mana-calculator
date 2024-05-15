import { Observable } from "rxjs"
import { Service } from "./Service"

export class SecondaryEffectService extends Service {
    override getUrl(): string {
        return 'secondary-effects'
    }

    getAll() : Observable<any> {
        return this.http.get(this.getBaseUrl())
    }
}