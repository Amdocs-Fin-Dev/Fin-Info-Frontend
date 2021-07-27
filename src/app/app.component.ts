import { Component,OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular 12';
 //agregue manualmente el constructor y el ngOnInit no se porque
  constructor(){}

  ngOnInit(): void {
  }

  cambiarNombre(){
    alert("Porfavor funciona :3");
    console.log("Si funcionaste :3");
  }

}




