import { Component, OnInit,Input } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { SessionService } from '../../services/session.service';
import { Router, ActivatedRoute, Params } from '@angular/router'
declare var $ :any;

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  @Input() courseId: string;

  reviews:any[]=[];

  review_date:any[]=[];

  reviewedArray:any[]=[];

  courseID_first:string;

  formData:{
    stars:number,
    first_name:string,
    last_name:string,
    description:string,
    course_id:string,
    user_email:string
  }={
    stars:0,
    first_name:"",
    last_name:"",
    description:"",
    course_id:"",
    user_email:""
  }

  stars={
    one:false,
    two:false,
    three:false,
    four:false,
    five:false
  }
  constructor(
    public courseService:CourseService,
    public sessionService:SessionService,
    private route:ActivatedRoute,
    private router:Router,) {


    this.route.params.subscribe((params:Params)=>{

     
      this.courseService.getCourse( params.name).subscribe(courses => {
      
        console.log(courses.course.id)
        this.courseID_first = courses.course.id;


        this.loadFeedback()

      })

  });

    
    
    
   }

  ngOnInit() {
    
    
  }

  loadFeedback(){
    
    this.courseService.getReviews(this.courseID_first).subscribe(reviews=>{

      if (reviews.reviews.length>0){
        this.reviews = reviews.reviews;
        // console.log(this.reviews)
      }
console.log(reviews.reviews)
      this.review_date=[];
      
      for (let i=0;i<this.reviews.length;i++){
        // console.log(this.reviews[i].id)

        
        this.review_date.push(this.calculateAgo(this.reviews[i].created_at))

        
          let review:{
                id:number,
                ishelpful:boolean
              }={
                id:i,
                ishelpful:false
              }
      
              this.reviewedArray.push(review)
        




        

      
      }

      console.log(this.reviewedArray)
      // console.log(this.review_date)

    });
  }
  addRating(no){
    this.formData.stars = no;
    if (no===5){
      this.stars={
        one:true,
        two:true,
        three:true,
        four:true,
        five:true
      }
    }else if(no===4){
      this.stars={
        one:true,
        two:true,
        three:true,
        four:true,
        five:false
      }
    }else if(no===3){
      this.stars={
        one:true,
        two:true,
        three:true,
        four:false,
        five:false
      }
    }else if(no===2){
      this.stars={
        one:true,
        two:true,
        three:false,
        four:false,
        five:false
      }
    }else if(no===1){
      this.stars={
        one:true,
        two:false,
        three:false,
        four:false,
        five:false
      }
    }


  }

  submitReview(){

    if (this.validateForm()){
      if(!confirm("Do You wish to add a review to the course?")){
        alert("Review Not Added")
      }else{
        this.formData.course_id = this.courseId
        this.courseService.addReview(this.formData).subscribe(review=>{
          // console.log(review)
          this.formData={
            stars:0,
            first_name:"",
            last_name:"",
            description:"",
            course_id:"",
            user_email:""
          }
          this.loadFeedback()
        })
      }
    }

    
    
    
  }
validateForm(){

  let isFormValid = false;
  
  if (this.formData.first_name === ""){
      alert("Please enter Your First Name")
      return isFormValid  
  }
  if (this.formData.last_name === ""){
      alert("Please enter Your Last Name")  
      return isFormValid
  }

  if (this.formData.stars === 0){
    alert("Minimum of one star is required")  
    return isFormValid
  }

  if (this.formData.description === ""){
    alert("Please enter your review")  
    return isFormValid
  }
  if (this.formData.user_email === ""){
    alert("Please enter your email")  
    return isFormValid
  }

  isFormValid = true;

  return isFormValid
}


calculateAgo(date){

  let utc_time = new Date().toUTCString();

  let current_date=new Date(utc_time).getTime();

  let review_date = Date.parse(date)

  let time_difference = current_date - review_date-19800000;

  if (time_difference<30000){
    return "A few seconds ago"
  }else if(time_difference<300000){
    return "A few minutes ago"
  }else if(time_difference<3600000){
    return "An hour ago"
  }else if(time_difference<86400000){
    return "A day ago"
  }else if(time_difference<1210000000){
    return "Two weeks ago"
  }else if(time_difference<2628000000){
    return "One month ago"
  }else{
    return new Date(date).toDateString()
  }
  // let date_difference:any = current_date.toLocaleDateString()

}



helpful(id,index){
  this.courseService.helpfulReview(id).subscribe(res => {

    if (res.status === "success"){
      this.reviewedArray[index].ishelpful = true;
    
      alert("Thank You for your valuable feedback");
    }
    

    
    
    })
}

reviewAdmin:{
  email:string,
  password:string
}={
  email:"",
  password:""
}

removeReviewId:string="";

launchReviewModal(id){
    this.removeReviewId = id;
    $('#removeReview').modal('toggle');
}

removeReview(){
  console.log(this.reviewAdmin)

  this.sessionService.checkUser(this.reviewAdmin).subscribe(res => {
        
    console.log(res)

    if (res.session==="granted"){

      this.courseService.deleteReview(this.removeReviewId).subscribe(res => {
        console.log(res) 
        if(res.status==="success"){

          this.reviewAdmin={
            email:"",
            password:""
          }
          
          this.loadFeedback();

          $('#removeReview').modal('hide');

          alert("Review Successfully Deleted");

        }else{
          alert("An error has occured. Please try again")
        }
       
    
        })

    }else if(res.session==="incorrect-password"){
      alert("Enter correct password");
    }else if(res.session==="incorrect-email"){
      alert("Enter correct email");
    } 
  
    })
}
}


