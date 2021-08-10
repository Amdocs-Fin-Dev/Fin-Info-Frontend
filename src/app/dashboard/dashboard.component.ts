import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public userDetails:any;
  // "firstName":"Satoko",
  // "lastName":"No ni",
  // "email":"aku.no.hana@gmail.com",
  // "idToken":"ye93ijdixs9c8xj3483"
  constructor(private router: Router, private service:SharedService) {
  }
  UserList: any = []; 
  ngOnInit(): void {
    //creamos de Key para los valores de autenticacion
    const storage = localStorage.getItem('google_auth');
    this.getUser();

    if (storage) {
      //convertimos la data
      this.userDetails = JSON.parse(storage);
    } else {
      this.signOut();
    }
    console.log(this.userDetails.idToken);
    console.log(this.userDetails.response.access_token);

    this.addUser();
  }

  signOut(): void {
    //removemos el usuario removiendo del local storage la data
    localStorage.removeItem('google_auth');
    this.router.navigateByUrl('/').then();
  }

  getUser():void{
    this.service.getUserList().subscribe(data=>{
      this.UserList = data;
      console.log(this.UserList);
    })
  }

  addUser():void{
    const username = this.userDetails.username;
    const firstName = this.userDetails.firstName;
    const lastName = this.userDetails.lastName;
    const email = this.userDetails.email;
    const idToken = this.userDetails.idToken;
    // const idToken = "eysldkj329445mjd";
    var result = {username, firstName, lastName, email, idToken}

    this.service.addUser(result).subscribe(res=>{
      alert("User registered!");
    });

    console.log("Some text here");
  }

  getPortfolio1():void{
    
  }

}
