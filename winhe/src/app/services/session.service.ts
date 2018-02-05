import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SessionService {

  constructor(public http:Http) {


   }

   generateSession(request){

    return this.http.post("http://127.0.0.1:8000/api/sessions", request)
        .map(res=> res.json());

   }

   checkLogin(request){

    return this.http.post("http://127.0.0.1:8000/api/sessions/login", request)
    .map(res=> res.json());

   }

   checkUser(request){

    return this.http.post("http://127.0.0.1:8000/api/sessions/user", request)
    .map(res=> res.json());

   }

}
