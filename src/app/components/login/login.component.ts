import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService, User } from 'src/app/service/data.service';


export class  LoginCredentail {
    userName: string
    password: string

    constructor(userName: string, password: string) {
        this.userName = userName;
        this.password = password;
    }
}

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

    userName: string
    password: string

    constructor(

        private dataService: DataService,
        private router: Router,

    ) {
    }

    ngOnInit(): void {
    }

    handleLogin() {

        var user = new LoginCredentail( this.userName,this.password)
        this.dataService.login(user).subscribe(data => {
            var user = data;
          
            localStorage.setItem('token', user.token);
            localStorage.setItem('role', user.role);
            console.log('elkoo') 
            this.router.navigate(['welcome']);
       
        }, error => {
      
          })

    }
}
