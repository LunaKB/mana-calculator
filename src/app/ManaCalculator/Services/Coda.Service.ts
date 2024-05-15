import { Observable } from "rxjs"
import { Service } from "./Service"

export class CodaService extends Service {
    override getUrl(): string {
        return 'codas'
    }

    getAll() : Observable<any> {
        return this.http.get(this.getBaseUrl())
    }
}