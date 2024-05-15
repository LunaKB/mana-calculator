import { Observable } from "rxjs"
import { Service } from "./Service"

export class CasterService extends Service {
    override getUrl(): string {
        return 'casters'
    }

    getAll() : Observable<any> {
        return this.http.get(this.getBaseUrl())
    }

    add(data: any) : Observable<any> {
        return this.http.post(this.getBaseUrl(), data, {'headers': this.headers})
    }

    update(id: string, data) : Observable<any> {
        return this.http.put(`${this.getBaseUrl()}/${id}`, data, {'headers': this.headers})
    }

    remove(id: string) : Observable<any> {
        return this.http.delete(`${this.getBaseUrl()}/${id}`)
    }
}