import { Injectable } from '@angular/core';
import { Http, Headers, ResponseContentType, Response  } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import * as FileSaver from 'file-saver';
import {Observable} from 'rxjs/Observable'

@Injectable()
export class CourseService {

  constructor(public http:Http) {

   }

   getCourses(){
      return this.http.get("http://127.0.0.1:8000/api/courses")
        .map(res=> res.json());
   }

   getCourse(name){
     
      let url = "http://127.0.0.1:8000/api/courses/"+ name;
      
      return this.http.get(url)
        .map(res=> res.json());
 }

    getCourseByName(name){
      return this.http.post("http://127.0.0.1:8000/api/courses/search",name)
        .map(res=> res.json());
    }

    getCourseById(id){
      return this.http.get("http://127.0.0.1:8000/api/course/"+id)
        .map(res=> res.json());
    }

    uploadCourseImage(formData){
      
      return this.http.post("http://127.0.0.1:8000/api/courses/image",formData)
      .map(res=> res.json());
  }

    addCourse(request){
      return this.http.post("http://127.0.0.1:8000/api/courses",request)
        .map(res=> res.json());
  }

  addReview(request){
    return this.http.post("http://127.0.0.1:8000/api/reviews",request)
      .map(res=> res.json());
}
  getReviews(id){
    return this.http.get("http://127.0.0.1:8000/api/reviews/course/"+id)
      .map(res=> res.json());
  }

  deleteReview(id){
     
    let url = "http://127.0.0.1:8000/api/reviews/"+ id;
    
    return this.http.delete(url)
      .map(res=> res.json());
}

helpfulReview(id){
  return this.http.get("http://127.0.0.1:8000/api/reviews/helpful/"+id)
        .map(res=> res.json());
}

  updateCourse(request,id){
    return this.http.put("http://127.0.0.1:8000/api/courses/"+id,request)
      .map(res=> res.json());
}


  deleteCourse(id){
     
    let url = "http://127.0.0.1:8000/api/courses/"+ id;
    
    return this.http.delete(url)
      .map(res=> res.json());
}











 /////////////////////////////////////////////////////////////////////////////////

 downloadFile(file_name){

  let url = "http://127.0.0.1:8000/api/courses/"+ file_name; 

  const headers = new Headers();
  headers.append('Accept', 'text/plain');
  this.http.get(url, { headers: headers })
    .toPromise()
    .then(response => this.saveToFileSystem(response,file_name));

 }

private saveToFileSystem(response,course_img_name) {
  const contentDispositionHeader: string = response.headers.get('Content-Disposition');
  const blob = new Blob([response._body], { type: 'text/plain' });
  FileSaver.saveAs(blob, course_img_name);
}




}
