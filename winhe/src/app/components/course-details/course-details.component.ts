import { Component, OnInit,ViewChild, AfterViewInit  } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import { CourseService } from '../../services/course.service';
import { LecturerService } from '../../services/lecturer.service';
import { Router, ActivatedRoute, Params } from '@angular/router'
import { FeedbackComponent } from '../../includes/feedback/feedback.component';


@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {

  name:string;
  courses:any[];
  lecturers:any[]=[];

  courseID:string;

  course:{
    id:number,
    created_at:string,
    updated_at:string,
    name:string,
    description:string,
    short_description:string,
    synopsis:string,
    what_will_i_learn:string,
    requirements:string,
    target_audience:string,
    curriculum:string,
    related_courses:string,
    course_img_path:string,
    video_url:string,
    includes:string,
    total_students:number
}

lecturer:{
  id:number,
  created_at:string,
  updated_at:string,
  name:string,
  title:string,
  description:string,
  rating:string,
  total_students:number,
  photo_url:string,
}

splitted_what_will_learn_first:string[]=[];
splitted_what_will_learn_second:string[]=[];

splitted_requirements:string[]=[];

splitted_target_audience:string[]=[];

splitted_includes:string[]=[];




curriculum:{
  title:string,
  description:string
} 

splitted_curriculum:any[]=[];

  constructor(
    public courseService:CourseService,
    private route:ActivatedRoute,
    private router:Router,
    public lecturerService:LecturerService,
    public sanitizer: DomSanitizer
  ) 
  
  {

    this.route.params.subscribe((params:Params)=>{
        this.name = params.name;
    });

    
    
    this.courseService.getCourse(this.name).subscribe(courses => {
        
      
      
        this.course = {
          "id":                 courses.course.id,
          "name":               courses.course.name,
          "created_at":         courses.course.created_at,
          "updated_at":         courses.course.updated_at,
          "description":        courses.course.description,
          "short_description":  courses.course.short_description,
          "synopsis":           courses.course.synopsis,
          "what_will_i_learn":  courses.course.what_will_i_learn,
          "requirements":       courses.course.requirements,
          "target_audience":    courses.course.target_audience,
          "curriculum":         courses.course.curriculum,
          "related_courses":    courses.course.related_courses,
          "course_img_path":    courses.course.course_img_path,
          "video_url":          courses.course.video_url,
          "includes":           courses.course.includes,
          "total_students":     courses.course.total_students
        };
          
        

        this.courseID=courses.course.id;
        

        this.getLecturerByCourse(this.course.id)

        
        this.splitData_curriculum();
        this.splitData_requirements();
        this.splitData_what_will_i_learn();
        this.splitData_target_audience();
        this.splitData_includes();
       

        
      })

     

  }

  ngOnInit() {

    
  }

  getLecturerByCourse(course_id){
      this.lecturerService.getLecturerByCourse(course_id).subscribe(lecturers => {

        let temp_lecturers:any[] = lecturers.lecturers;

        

        for (var index=0; index < temp_lecturers.length; index++){

        let lecturer_id:string="";
        lecturer_id = temp_lecturers[index].lecturer_id;
       
        
        this.lecturerService.getLecturerById(lecturer_id).subscribe(lecturer =>{

     
          this.lecturers.push(lecturer.lecturer[0])

        
         });
    
        }

    });
      

  }



  splitData_what_will_i_learn(){

    var splitted = this.course.what_will_i_learn.split("$#");

    for (var i=0; i < splitted.length-1; i++){

      if (i%2===0){
          this.splitted_what_will_learn_first.push(splitted[i])
   
      }else{
          this.splitted_what_will_learn_second.push(splitted[i])
      }

    }
    
  }

  splitData_requirements(){

    var splitted = this.course.requirements.split("$#");
    this.splitted_requirements = splitted;
    
  }


  splitData_curriculum(){

    var splitted_curriculum = this.course.curriculum.split("$#");

    for (var i=0; i < splitted_curriculum.length-1; i++){
        if(splitted_curriculum[i] === ""){
          splitted_curriculum.splice(i,1)
        }
    }

   
    var splitted_curriculum_data =[];

    

    var temp_splitted_curriculum:any[]=[];
    

    for (var i=0; i < splitted_curriculum.length-1; i++){
  

      var temp_curriculum:{
        title:string,
        description:string,
        id:number,
        href_id:string
      } = {
        title:"",
        description:"",
        id:0,
        href_id: ""
      }
      
      splitted_curriculum_data = splitted_curriculum[i].split("%$");

      temp_curriculum.id = i;
      temp_curriculum.title = splitted_curriculum_data[0].trim();
      temp_curriculum.description = splitted_curriculum_data[1];
      temp_curriculum.href_id = "id_"+i;

      // console.log(temp_curriculum);
      

    


      temp_splitted_curriculum.push(temp_curriculum);
      
      
    }

  
  this.splitted_curriculum = temp_splitted_curriculum;

    
  }

  splitData_target_audience(){

    var splitted = this.course.target_audience.split("$#");
    this.splitted_target_audience = splitted;
    
  }

  splitData_includes(){

    var splitted = this.course.includes.split("$#");
    this.splitted_includes = splitted;
    
  }


}
