import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService, GoogleLoginProvider } from 'angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private router:Router,
    private authService: SocialAuthService
  ) { }

  ngOnInit(): void {
  } 

  signInHandle():void{
    //Manejamos toda la autenticacion y todo lo pasamos en el Key 'google_auth'
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((data)=>{
      localStorage.setItem('google_auth', JSON.stringify(data));
      console.log(data);
      //redireccionamos la url al dashboard donde esta el componente dashboard
      this.router.navigateByUrl('/dashboard').then();
      window.location.reload();

    });
  }

  
}
