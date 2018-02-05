import { Injectable } from '@angular/core';
import { Http, Headers, ResponseContentType, Response  } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class FeedbackService {

  constructor(public http:Http) { }

  createFeedback(request){
    return this.http.post("http://127.0.0.1:8000/api/feedbacks",request)
      .map(res=> res.json());
}

}
