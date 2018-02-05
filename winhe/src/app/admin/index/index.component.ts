import { Component, OnInit,ElementRef, Input, ViewChild } from '@angular/core';
declare var $ :any;

import { LecturerService } from '../../services/lecturer.service';
import { CourseService } from '../../services/course.service';
import { SessionService } from '../../services/session.service';
import { FeedbackService } from '../../services/feedback.service';

import { Router, ActivatedRoute, Params } from '@angular/router'
import { error } from 'selenium-webdriver';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  @ViewChild('file') inputEl: ElementRef;
  @ViewChild('lecturer') inputlec: ElementRef;
  

  isLoggedIn:number=0;
  session:{
    email:string,
    token:string,
    user_id:string,
    name:string
    
  }

  page:string="";
  isCourse:boolean=true;;
  courses:any[]=[];
  lecturers:any[]=[];

  isCoursesAvailable:boolean=false;
  isLecturersAvailable:boolean=false;

  courseSearch="";
  lecturerSearch="";

  addForm:{
    pageOne:boolean,
    pageTwo:boolean,
    pageThree:boolean,
    pageFour:boolean,
    pageFive:boolean,
    pageSix:boolean,
    progress:string,
  }={
    pageOne:true,
    pageTwo:false,
    pageThree:false,
    pageFour:false,
    pageFive:false,
    pageSix:false,
    progress:"17%"
  }

  addLecturerForm:{
    pageOne:boolean,
    pageTwo:boolean,
    progress:string,
  }={
    pageOne:true,
    pageTwo:false,
    progress:"50%"
  }

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

formData:{
  name:string,
  synopsis:string,
  short_decription:string,
  what_will_i_learn:any[],
  target_audience:any[],
  requirements:any[],
  includes:{
    hours:string,
    practicals:string,
    lessons:string,
    support_period:string,
    completion:string
  },
  description:string,
  curriculum:any[],
  video_url:string,
  related_courses:any[],
  course_img_path:string,
  short_name:string,
  lecturers:any[]
}={
  name:"",
  synopsis:"",
  short_decription:"",
  what_will_i_learn:[],
  target_audience:[],
  requirements:[],
  includes:{
    hours:"",
    practicals:"",
    lessons:"",
    support_period:"",
    completion:""
  },
  description:"",
  curriculum:[],
  video_url:"",
  related_courses:[],
  course_img_path:"",
  short_name:"",
  lecturers:[]
}

formDataLecturer:{
  id:number,
  created_at:string,
  updated_at:string,
  name:string,
  title:string,
  description:string,
  rating:string,
  total_students:number,
  photo_url:string,
}={
  id:0,
  created_at:"",
  updated_at:"",
  name:"",
  title:"",
  description:"",
  rating:"",
  total_students:0,
  photo_url:"",
}

what_will_i_learn:string = "";
target_audience:string = "";
requirements:string = "";

curriculum_heading:string = "";
curriculum_description:string = "";

imageUploaded:boolean = false;
uploadedImage: any="";

lecturerImageUploaded:boolean = false;
uploadedLecturerImage: any="";


  constructor(
    public courseService:CourseService,
    public feedbackService:FeedbackService,
    public lecturerService:LecturerService,
    private route:ActivatedRoute,
    private router:Router,
    public sessionService:SessionService,   
  ) 
 
  { 
    this.session={
      email:window.sessionStorage.getItem("email"),
      token:window.sessionStorage.getItem("token"),
      user_id:window.sessionStorage.getItem("user_id"),
      name:window.sessionStorage.getItem("name")
    }

    this.sessionService.checkLogin(this.session).subscribe(session => {
      if (session.session === "loggedin"){

        
        this.isLoggedIn=2;
      }else{
        this.isLoggedIn=1;
      }

    })
    
    this.loadAdminPage()
    

  }

  ngOnInit() {
  }

  public logOut(){

    window.sessionStorage.removeItem("email");
    window.sessionStorage.removeItem("token");
    window.sessionStorage.removeItem("user_id");
    window.sessionStorage.removeItem("name");

    this.router.navigate([''])

    this.isLoggedIn=1;

    

  }

  loadAdminPage(){
    this.route.params.subscribe((params:Params)=>{
      this.page = params.page;
        
      if (this.page === "lecturer"){
        this.isCourse= false;
        this.pageLoadForLecturers();
      }else{
        this.isCourse= true;
        this.pageLoadForCourses();
        
      }
  });
  }

  pageLoadForCourses(){

    this.courseService.getCourses().subscribe(courses => {
        
      this.courses = courses.courses;
      if (courses.courses.length === 0){
        this.isCoursesAvailable=false
      }else{
        this.isCoursesAvailable=true;
      }
      

      // console.log(this.courses)
       

      })




  }
  pageLoadForLecturers(){

    this.lecturerService.getLecturers().subscribe(lecturers => {
        
      this.lecturers = lecturers.lecturers;
      
      if (lecturers.lecturers.length === 0){
        this.isLecturersAvailable=false
      }else{
        this.isLecturersAvailable=true;
      }
      

      // console.log(this.courses)
       

      })

    



  }

  onNext(){

    if (this.addForm.pageOne===true){

        this.addForm.pageOne = false;
        this.addForm.pageTwo = true;
        this.addForm.progress = "34%";

    }else if(this.addForm.pageTwo===true){

        this.addForm.pageTwo = false;
        this.addForm.pageThree = true;
        this.addForm.progress = "51%";

      }else if(this.addForm.pageThree===true){

        this.addForm.pageThree = false;
        this.addForm.pageFour = true;
        this.addForm.progress = "68%";

      }else if(this.addForm.pageFour===true){

        this.addForm.pageFour = false;
        this.addForm.pageFive = true;
        this.addForm.progress = "85%";

      }else if(this.addForm.pageFive===true){

        this.addForm.pageFive = false;
        this.addForm.pageSix = true;
        this.addForm.progress = "100%";

        this.lecturerService.getLecturers().subscribe(lecturers => {
          this.lecturers = lecturers.lecturers;
        });


    }
    
    

  }

  onLecturerNext(){

    if (this.addLecturerForm.pageOne===true){

        this.addLecturerForm.pageOne = false;
        this.addLecturerForm.pageTwo = true;
        this.addLecturerForm.progress = "50%";

    }

  }

  onPrevious(){

    if (this.addForm.pageTwo===true){

      this.addForm.pageOne = true;
      this.addForm.pageTwo = false;
      this.addForm.progress = "17%";

  }else if(this.addForm.pageThree===true){

      this.addForm.pageTwo = true;
      this.addForm.pageThree = false;
      this.addForm.progress = "34%";

    }else if(this.addForm.pageFour===true){

      this.addForm.pageThree = true;
      this.addForm.pageFour = false;
      this.addForm.progress = "51%";

    }else if(this.addForm.pageFive===true){

      this.addForm.pageFour = true;
      this.addForm.pageFive = false;
      this.addForm.progress = "68%";

    }else if(this.addForm.pageSix===true){

      this.addForm.pageFive = true;
      this.addForm.pageSix = false;
      this.addForm.progress = "85%";

  }

  }

  onLecturerPrevious(){

    if (this.addLecturerForm.pageTwo===true){

      this.addLecturerForm.pageOne = true;
      this.addLecturerForm.pageTwo = false;
      this.addLecturerForm.progress = "0%";

  }

  }

  addWhatWillILearn(){
    this.formData.what_will_i_learn.push(this.what_will_i_learn)
    this.what_will_i_learn="";
  }

  removeWhatWillILearn(indx){
    this.formData.what_will_i_learn.splice(indx,1)

  }

  addTargetAudience(){
    this.formData.target_audience.push(this.target_audience)
    this.target_audience="";
  }

  removeTargetAudience(indx){
    this.formData.target_audience.splice(indx,1)

  }

  addRequirements(){
    this.formData.requirements.push(this.requirements)
    this.requirements="";
  }

  removeRequirements(indx){
    this.formData.requirements.splice(indx,1)

  }

  addCurriculum(){

    let curriculum :{
      curriculum_heading:string,
      curriculum_description:string,
    }={
      curriculum_heading:this.curriculum_heading,
      curriculum_description:this.curriculum_description
    }
    this.formData.curriculum.push(curriculum)

    this.curriculum_heading="";
    this.curriculum_description="";

    
  }

  removeCurriculum(indx){
    this.formData.curriculum.splice(indx,1)

  }


  upload() {
    let inputEl: HTMLInputElement = this.inputEl.nativeElement;
    let formData = new FormData();

    formData.append('file', inputEl.files.item(0));

    this.courseService.uploadCourseImage(formData).subscribe(courseimage=>{

      
      this.formData.course_img_path = courseimage.course_image;

      

      this.uploadedImage = "http://127.0.0.1:8000/api/courses/image/" + courseimage.course_image;

      this.imageUploaded = true;
      

    })
    

 


    
}

uploadLecturerImage() {
  let inputlec: HTMLInputElement = this.inputlec.nativeElement;
  let formData = new FormData();

  formData.append('lecturer', inputlec.files.item(0));

  this.lecturerService.uploadLecturerImage(formData).subscribe(lecturer_image=>{

    
    this.formDataLecturer.photo_url = lecturer_image.lecturer_image;

    

    this.uploadedLecturerImage = "http://127.0.0.1:8000/api/lecturers/image/" + lecturer_image.lecturer_image;

    
    this.lecturerImageUploaded = true;
    

  })
}


clearForm(){
  this.formData={
    name:"",
    synopsis:"",
    short_decription:"",
    what_will_i_learn:[],
    target_audience:[],
    requirements:[],
    includes:{
      hours:"",
      practicals:"",
      lessons:"",
      support_period:"",
      completion:""
    },
    description:"",
    curriculum:[],
    video_url:"",
    related_courses:[],
    course_img_path:"",
    short_name:"",
    lecturers:[]
  }
}


addCourse(){

  if (this.validateForm() === true){

    let JSON_DATA_OBJECT : {
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
      total_students:number,
      short_name:string,
      lecturers:string
    }={
      name:"",
      description:"",
      short_description:"",
      synopsis:"",
      what_will_i_learn:"",
      requirements:"",
      target_audience:"",
      curriculum:"",
      related_courses:"",
      course_img_path:"",
      video_url:"",
      includes:"",
      total_students:0,
      short_name:"",
      lecturers:""
    }
  
  
    JSON_DATA_OBJECT.name               =       this.formData.name;
    JSON_DATA_OBJECT.description        =       this.formData.description;
    JSON_DATA_OBJECT.short_description  =       this.formData.short_decription;
    JSON_DATA_OBJECT.synopsis           =       this.formData.synopsis;
    JSON_DATA_OBJECT.what_will_i_learn  =       this.formData.what_will_i_learn.join("$#");
    JSON_DATA_OBJECT.requirements       =       this.formData.requirements.join("$#");
    JSON_DATA_OBJECT.target_audience    =       this.formData.target_audience.join("$#");

    let tempName = this.formData.name.toLowerCase();
    JSON_DATA_OBJECT.short_name         =    tempName.replace(/ /g,'');
  
  
    let tempCurriculum:any[]=[];
  
   
    for(var i=0; i <= this.formData.curriculum.length-1; i++){
      
      tempCurriculum.push(this.formData.curriculum[i].curriculum_heading+"%$"+this.formData.curriculum[i].curriculum_description);
    }
    
    
    JSON_DATA_OBJECT.curriculum         =       tempCurriculum.join("$#");
    JSON_DATA_OBJECT.related_courses    =       this.formData.related_courses.join()
    JSON_DATA_OBJECT.course_img_path    =       this.formData.course_img_path;
    JSON_DATA_OBJECT.video_url          =       this.formData.video_url;
    
    JSON_DATA_OBJECT.includes           =       this.formData.includes.hours + " hours of lectures $#" +  this.formData.includes.practicals + " practicals $#" + this.formData.includes.lessons  + " lessons $#" +  this.formData.includes.support_period  + " support period $#" +   this.formData.includes.completion +"$#"; 
    JSON_DATA_OBJECT.lecturers          =       this.formData.lecturers.join()
  
    try{
  
      this.courseService.addCourse(JSON_DATA_OBJECT).subscribe(response=>{
        if (response.status === "success"){

          let request:{
            course_id:string
          }={
            course_id:response.course.id
          }

          this.feedbackService.createFeedback(request).subscribe(response=>{
            console.log(response)

            alert("Course Added Successfully")

          this.formData={
            name:"",
            synopsis:"",
            short_decription:"",
            what_will_i_learn:[],
            target_audience:[],
            requirements:[],
            includes:{
              hours:"",
              practicals:"",
              lessons:"",
              support_period:"",
              completion:""
            },
            description:"",
            curriculum:[],
            video_url:"",
            related_courses:[],
            course_img_path:"",
            short_name:"",
            lecturers:[]
          }

          this.addForm={
            pageOne:true,
            pageTwo:false,
            pageThree:false,
            pageFour:false,
            pageFive:false,
            pageSix:false,
            progress:"17%"
          }

          $('#add').modal('hide');
        
          this.pageLoadForCourses();

          });
          

          
         
        }else{
          
          alert("There was an error please re-enter the form")
        }

        
  
  
  
      })
  
    }catch(e){
  
      console.log(e.status)
    }
  
    
  
    
  }

  
  
}

addLecturer(){
  
// console.log(this.formData)

if (this.validateLecturerForm() === true){

  let JSON_DATA_OBJECT : {
    id:number,
    created_at:string,
    updated_at:string,
    name:string,
    title:string,
    description:string,
    rating:string,
    total_students:number,
    photo_url:string,
  }={
    id:0,
    created_at:"",
    updated_at:"",
    name:"",
    title:"",
    description:"",
    rating:"",
    total_students:0,
    photo_url:"",
}


  JSON_DATA_OBJECT.name                 =       this.formDataLecturer.name;
  JSON_DATA_OBJECT.description          =       this.formDataLecturer.description;
  JSON_DATA_OBJECT.title                =       this.formDataLecturer.title;
  JSON_DATA_OBJECT.photo_url            =       this.formDataLecturer.photo_url;

  try{

    

    this.lecturerService.addLecturer(JSON_DATA_OBJECT).subscribe(response=>{
      if (response.status === "success"){
        alert("Lecturer Added Successfully")

        this.formDataLecturer={
          id:0,
          created_at:"",
          updated_at:"",
          name:"",
          title:"",
          description:"",
          rating:"",
          total_students:0,
          photo_url:"",
        }

        $('#addLecturer').modal('hide');

        this.pageLoadForLecturers();
      

       
      }else{
        alert("There was an error please re-enter the form")
      }

      



    })

  }catch(e){

    console.log(e.status)
  }

  

  
}

}
validateForm(){
  
 
  let isFormValid = false;
  
  if (this.formData.name === ""){
      alert("Please enter the Name of The Course")
      return isFormValid  
  }
  if (this.formData.synopsis === ""){
      alert("Please enter the Synopsis of The Course")  
      return isFormValid
  }

  if (this.formData.short_decription === ""){
    alert("Please enter the Short Description of The Course")  
    return isFormValid
  }

  if (this.formData.what_will_i_learn.length === 0){
    alert("Minimum of one What Will I learn isLecturersAvailable required")  
    return isFormValid
  }
  if (this.formData.target_audience.length === 0){
    alert("Minimum of one Target Audience isLecturersAvailable required")  
    return isFormValid
  }
  if (this.formData.requirements.length === 0){
    alert("Minimum of one Requirment isLecturersAvailable required")  
    return isFormValid
  }
  if (this.formData.includes.completion === ""){
    alert("Please enter what will be awareded after completion")
    return isFormValid  
  }
  if (this.formData.includes.hours === ""){
    alert("Please enter how many hours isLecturersAvailable the course") 
    return isFormValid 
  }
  if (this.formData.includes.lessons === ""){
    alert("Please enter how many lessons are in the course")  
    return isFormValid
  }
  if (this.formData.includes.practicals === ""){
    alert("Please enter how many practicals are in the course")  
    return isFormValid
  }
  if (this.formData.includes.support_period === ""){
    alert("Please enter how long isLecturersAvailable the siupport period isLecturersAvailable in the course")  
    return isFormValid
  }

  if (this.formData.description === ""){
    alert("Please enter a description")  
    return isFormValid
  }

  if (this.formData.curriculum.length === 0){
    alert("Please enter the curriculum of the course") 
    return isFormValid
  }

  if (this.formData.course_img_path === ""){
    alert("Please upload a course image") 
    return isFormValid
  }

  isFormValid = true;

  return isFormValid
  
}

validateLecturerForm(){

  
   
  let isFormValid = false;
  
  if (this.formDataLecturer.name === ""){
      alert("Please enter the Name of The Lecturer")
      return isFormValid  
  }
  if (this.formDataLecturer.title === ""){
    alert("Please enter the Title of The Lecturer")
    return isFormValid  
}
  if (this.formDataLecturer.description === ""){
  alert("Please enter the Description of The Lecturer")
  return isFormValid  
}
  if (this.formDataLecturer.photo_url === ""){
  alert("Please Upload a Photo of the Lecturer")
  return isFormValid  
}

  isFormValid = true;

  return isFormValid
  
}

searchCourse(){

  if (this.courseSearch === ""){
    this.pageLoadForCourses()

  }else{
    
    let JSON_REQUEST :{
      search:any;
    }={
      search:this.courseSearch
    };
  
  
 
    this.courseService.getCourseByName(JSON_REQUEST).subscribe(courses => {
          
      this.courses = courses.courses;
      
      if (courses.courses.length === 0){
        console.log(courses.courses.length)
        this.isCoursesAvailable=false
      }else{
        this.isCoursesAvailable=true;
      }
  
      })
  }
  



}

searchLecturer(){

  if (this.lecturerSearch === ""){
    this.pageLoadForLecturers()

  }else{
    
    let JSON_REQUEST :{
      search:any;
    }={
      search:this.lecturerSearch
    };
  
  
 
    this.lecturerService.getLecturerByName(JSON_REQUEST).subscribe(lecturers => {
          
      this.lecturers = lecturers.lecturers;
      
      if (lecturers.lecturers.length === 0){
        console.log(lecturers.lecturers.length)
        this.isLecturersAvailable=false
      }else{
        this.isLecturersAvailable=true;
      }
  
      })
  }
  



}

deleteCourseData:{
  id:string,
  name:string
}={
  id:"",
  name:""
}

loadDeleteCourse(courseID,courseName){
  this.deleteCourseData={
    id:courseID,
    name:courseName
  }


}

editCourseID:string="";

setEditCourseId(id){
  this.editCourseID = id;
  this.loadEditCourse(id)
}
loadEditCourse(courseID){
  
  this.courseService.getCourseById(courseID).subscribe(course => {
    console.log(course.course)
    this.formData={
      name:course.course.name,
      synopsis:course.course.synopsis,
      short_decription:course.course.short_description,
      what_will_i_learn:this.splitData_what_will_i_learn(course.course.what_will_i_learn),
      target_audience:this.splitData_target_audience(course.course.target_audience),
      requirements:this.splitData_requirements(course.course.requirements),
      includes:{
        hours:this.splitData_includes_hours(course.course.includes),
        practicals:this.splitData_includes_practicals(course.course.includes),
        lessons:this.splitData_includes_lessons(course.course.includes),
        support_period:this.splitData_includes_support_period(course.course.includes),
        completion:this.splitData_includes_completion(course.course.includes)
      },
      description:course.course.description,
      curriculum:this.splitData_curriculum(course.course.curriculum),
      video_url:course.course.video_url,
      related_courses:course.course.related_courses.split(","),
      course_img_path:course.course.course_img_path,
      short_name:"",
      lecturers:[]
    }
    console.log(this.formData)
  });


}

updateCourse(){
  if (this.validateForm() === true){

    let JSON_DATA_OBJECT : {
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
      total_students:number,
      short_name:string,
      lecturers:string
    }={
      name:"",
      description:"",
      short_description:"",
      synopsis:"",
      what_will_i_learn:"",
      requirements:"",
      target_audience:"",
      curriculum:"",
      related_courses:"",
      course_img_path:"",
      video_url:"",
      includes:"",
      total_students:0,
      short_name:"",
      lecturers:""
    }
  
  
    JSON_DATA_OBJECT.name               =       this.formData.name;
    JSON_DATA_OBJECT.description        =       this.formData.description;
    JSON_DATA_OBJECT.short_description  =       this.formData.short_decription;
    JSON_DATA_OBJECT.synopsis           =       this.formData.synopsis;
    JSON_DATA_OBJECT.what_will_i_learn  =       this.formData.what_will_i_learn.join("$#");
    JSON_DATA_OBJECT.requirements       =       this.formData.requirements.join("$#");
    JSON_DATA_OBJECT.target_audience    =       this.formData.target_audience.join("$#");

    let tempName = this.formData.name.toLowerCase();
    JSON_DATA_OBJECT.short_name         =    tempName.replace(/ /g,'');
  
  
    let tempCurriculum:any[]=[];
  
   
    for(var i=0; i <= this.formData.curriculum.length-1; i++){
      
      tempCurriculum.push(this.formData.curriculum[i].curriculum_heading+"%$"+this.formData.curriculum[i].curriculum_description);
    }
    
    
    JSON_DATA_OBJECT.curriculum         =       tempCurriculum.join("$#");
    JSON_DATA_OBJECT.related_courses    =       this.formData.related_courses.join()
    JSON_DATA_OBJECT.course_img_path    =       this.formData.course_img_path;
    JSON_DATA_OBJECT.video_url          =       this.formData.video_url;
    
    JSON_DATA_OBJECT.includes           =       this.formData.includes.hours + " hours of lectures $#" +  this.formData.includes.practicals + " practicals $#" + this.formData.includes.lessons  + " lessons $#" +  this.formData.includes.support_period  + " support period $#" +   this.formData.includes.completion +"$#"; 
    JSON_DATA_OBJECT.lecturers          =       this.formData.lecturers.join()
  
    try{
  
      this.courseService.updateCourse(JSON_DATA_OBJECT,this.editCourseID).subscribe(response=>{
        if (response.status === "success"){
          alert("Course Updated Successfully")

          this.formData={
            name:"",
            synopsis:"",
            short_decription:"",
            what_will_i_learn:[],
            target_audience:[],
            requirements:[],
            includes:{
              hours:"",
              practicals:"",
              lessons:"",
              support_period:"",
              completion:""
            },
            description:"",
            curriculum:[],
            video_url:"",
            related_courses:[],
            course_img_path:"",
            short_name:"",
            lecturers:[]
          }

          this.addForm={
            pageOne:true,
            pageTwo:false,
            pageThree:false,
            pageFour:false,
            pageFive:false,
            pageSix:false,
            progress:"17%"
          }

          $('#edit').modal('hide');
        
          this.pageLoadForCourses();
         
        }else{
          
          alert("There was an error please re-enter the form")
        }

        
  
  
  
      })
  
    }catch(e){
  
      console.log(e.status)
    }

  }
}
deleteCourse(){

  this.courseService.deleteCourse(this.deleteCourseData.id).subscribe(res => {
    console.log(res) 
    if(res.status==="success"){
      alert("Course Successfully Deleted");
      
      this.pageLoadForCourses();
      $('#delete').modal('hide');
    }else{
      alert("An error has occured. Please try again")
    }
   

    })
  
}

splitted_what_will_learn_first:string[]=[];
splitted_what_will_learn_second:string[]=[];
splitted_requirements:string[]=[];
splitted_target_audience:string[]=[];
splitted_includes:string[]=[];

splitData_what_will_i_learn(what_will_i_learn){

  var splitted = what_will_i_learn.split("$#");

  return splitted;

 
  
}


splitData_requirements(requirements){

  var splitted = requirements.split("$#");
  return splitted;
  
}


splitData_curriculum(curriculum){

  var splitted_curriculum = curriculum.split("$#");

  for (var i=0; i < splitted_curriculum.length-1; i++){
      if(splitted_curriculum[i] === ""){
        splitted_curriculum.splice(i,1)
      }
  }
  var splitted_curriculum_data =[];
  var temp_splitted_curriculum:any[]=[];
  
  for (var i=0; i <= splitted_curriculum.length-1; i++){
    
    splitted_curriculum_data = splitted_curriculum[i].split("%$");


    let curriculum :{
      curriculum_heading:string,
      curriculum_description:string,
    }={
      curriculum_heading:splitted_curriculum_data[0].trim(),
      curriculum_description:splitted_curriculum_data[1]
    }

    temp_splitted_curriculum.push(curriculum);
    
  }


return temp_splitted_curriculum;

  
}

splitData_target_audience(target_audience){

  var splitted = target_audience.split("$#");
  return splitted;
  
}

splitData_includes_hours(includes){

  var splitted =includes.split("$#");
  console.log(splitted)
  var hours = splitted[0].split(" hours")[0];
  console.log(hours)

  return hours
  
}

splitData_includes_practicals(includes){

  var splitted =includes.split("$#");

  var practicals = splitted[1].split(" practicals")[0];

  return practicals
  
}

splitData_includes_lessons(includes){

  var splitted =includes.split("$#");
  var lessons = splitted[2].split(" lessons")[0];


  return lessons
  
}

splitData_includes_support_period(includes){

  var splitted =includes.split("$#");
  var support_period = splitted[3].split(" support")[0];


  return support_period
  
}

splitData_includes_completion(includes){

  var splitted =includes.split("$#");
  var completion = splitted[4]

  return completion
  
}


}
