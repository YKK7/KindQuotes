import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

@Injectable()
export class QuoteService {
    constructor(private _http: Http) {

    }

    getAllQuotes(): Observable<any> {
        return this._http.get("http://localhost:8080/quotes/")
            .map(response => response.json());
    }

    postQuote(quote: any):Observable<any> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.post("http://localhost:8080/quotes/", JSON.stringify(quote), { headers: headers });     
    }

    delete(quote: any):Observable<any>{
        let DELETE_THIS = "http://localhost:8080/quotes/" + quote.id;
        return this._http.delete(DELETE_THIS);
    }

    getQuote(id: any):Observable<any>{
        return this._http.get("http://localhost:8080/quotes/" + id).map(response => response.json());
    }
}