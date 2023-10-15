import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],  
})


export class LoginComponent implements OnInit {
  
  constructor() { }

  ngOnInit(): void {
  }

  showRecover = false;
  hideLogin = true

  toggle = (() => {
  this.showRecover = !this.showRecover
  this.hideLogin = !this.hideLogin}
  )
}

