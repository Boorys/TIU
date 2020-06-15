import { Component, OnInit } from '@angular/core';
import { DataService, User } from 'src/app/service/data.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.css']
})

export class WindowComponent implements OnInit {

  users: User[];
  role: boolean
  constructor(

    private service: DataService,
    private route: ActivatedRoute,
    private router: Router,
   
  ) { }


    ngOnInit(): void {

   
      this.service.getUsersPagable(0, 10, 'FirstName', '0').subscribe(data => {
        this.users = data;
  
        console.log('refresh');
      }, error => {
        console.log("Error while fetching users!");
        console.log(error);
      })
    }
  
    userEmit(userEmit:User[])
    {
      this.users=userEmit
   
    }


}
