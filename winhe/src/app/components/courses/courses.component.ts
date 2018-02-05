import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {


  courses: string[];
  coursedetails: any[];

  coursedetail = {
    id:1,
    shtname:"java-associate",
    name:"Java Associate",
    shtdescription: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.",
    imgPath : "../../../assets/img/course-resize.jpg"
  }

  constructor() {
    this.courses = ["Java","PHP","C#","ASP.NET"];

    this.coursedetails = [this.coursedetail,this.coursedetail,this.coursedetail,this.coursedetail,this.coursedetail,this.coursedetail,this.coursedetail];
   
   }

  ngOnInit() {
  }

}
