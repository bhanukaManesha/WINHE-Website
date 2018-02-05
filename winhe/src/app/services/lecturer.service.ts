import { Injectable } from '@angular/core';
import { Http, Headers, ResponseContentType, Response  } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import * as FileSaver from 'file-saver';
import {Observable} from 'rxjs/Observable'

@Injectable()
export class LecturerService {

  constructor(public http:Http) { }

  getLecturers(){
    return this.http.get("http://127.0.0.1:8000/api/lecturers")
      .map(res=> res.json());
      
  }

  getLecturerByCourse(course_id){
    return this.http.get("http://127.0.0.1:8000/api/lecturers/course/"+course_id)
      .map(res=> res.json());
      
  }

  getLecturerById(id){
    return this.http.get("http://127.0.0.1:8000/api/lecturers/"+id)
      .map(res=> res.json());
      
  }

  uploadLecturerImage(formData){
      
    return this.http.post("http://127.0.0.1:8000/api/lecturers/image",formData)
    .map(res=> res.json());
}

  addLecturer(request){
  return this.http.post("http://127.0.0.1:8000/api/lecturers",request)
    .map(res=> res.json());
}

getLecturerByName(name){
  return this.http.post("http://127.0.0.1:8000/api/lecturers/search",name)
    .map(res=> res.json());
}


}


