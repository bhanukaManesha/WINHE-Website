import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email:string="";
  password:string="";

  login:string="0";

  request:{
    email:string,
    password:string
  }

  constructor(
    public sessionService:SessionService,
    private _router: Router
  ) { }

  ngOnInit() {
  }

  onEmailBlur(){
    
  }

  onPasswordBlur(){
    
  }

  onSubmit(){



    this.request = {
      email: this.email,
      password :this.password
    }

    this.sessionService.generateSession(this.request).subscribe(session_user => {
        
    console.log(session_user)

    if (session_user.status==="success"){

      window.sessionStorage.setItem("email",session_user.user.email);
      window.sessionStorage.setItem("name",session_user.user.name);
      window.sessionStorage.setItem("token",session_user.user.token);
      window.sessionStorage.setItem("user_id",session_user.user.user_id);

      
      this._router.navigate(['admin/course'])

    }

    if (session_user.message === "nouser"){

        this.login="1";

    }else if(session_user.message === "passwordincorrect"){

        this.login="2";

      }
     
      
    })

    

  }
}
