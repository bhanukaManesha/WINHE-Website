import { Component, OnInit } from '@angular/core';

import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {


  mainCourse:any[]=[];
  courses: any[];
  coursedetails: any[];

  constructor(public courseService:CourseService,) {
    this.mainCourse = ["Java","PHP","C#","ASP.NET"];

    this.loadCourses();
   }

  ngOnInit() {
  }

  loadCourses(){
    this.courseService.getCourses().subscribe(courses => {
        
      this.courses = courses.courses;

  });

}

}

