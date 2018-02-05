import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http'
import { FormsModule } from '@angular/forms';



import { AppComponent } from './app.component';
import { NavbarComponent } from './includes/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { CoursesComponent } from './components/courses/courses.component';
import { CareersComponent } from './components/careers/careers.component';
import { NewsComponent } from './components/news/news.component';
import { ContactusComponent } from './components/contactus/contactus.component';
import { CourseDetailsComponent } from './components/course-details/course-details.component';
import { FooterComponent } from './includes/footer/footer.component';
import { FeedbackComponent } from './includes/feedback/feedback.component';

import { CourseService } from './services/course.service';
import { SessionService } from './services/session.service';
import { LecturerService } from './services/lecturer.service';
import { FeedbackService } from './services/feedback.service';

import { LoginComponent } from './admin/login/login.component';
import { IndexComponent } from './admin/index/index.component';
import { AdminnavbarComponent } from './admin/includes/adminnavbar/adminnavbar.component';

const appRoutes:Routes = [
  {path:'',component:HomeComponent},
  {path:'courses',component:CoursesComponent},
  {path:'course/:name',component:CourseDetailsComponent},
  {path:'contactus',component:ContactusComponent},
  {path:'news',component:NewsComponent},
  {path:'careers',component:CareersComponent},
  {path:'admin',component:IndexComponent},
  {path:'admin/:page',component:IndexComponent}
]
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    CoursesComponent,
    CareersComponent,
    NewsComponent,
    ContactusComponent,
    CourseDetailsComponent,
    FooterComponent,
    FeedbackComponent,
    LoginComponent,
    IndexComponent,
    AdminnavbarComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpModule,
    FormsModule,
    
  ],
  providers: [CourseService,SessionService,LecturerService,FeedbackService],
  bootstrap: [AppComponent]
})
export class AppModule { }
