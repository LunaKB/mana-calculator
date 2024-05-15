import { HttpClient, HttpHeaders } from "@angular/common/http"
import { DataService } from "./Data/DataService";

export class Service {
    protected http: HttpClient
    protected headers = { 'Content-Type': 'application/json'};

    constructor() {
        this.http = DataService.getHttp()
    }

    getBaseUrl() : string {
        return `${DataService.getUrl()}${this.getUrl()}`
    }

    getUrl() : string {
        return  ''
    }
    
}