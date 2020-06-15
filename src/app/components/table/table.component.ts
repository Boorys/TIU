import { Component, OnInit } from '@angular/core';
import { DataService, User } from 'src/app/service/data.service';
import { Router, ActivatedRoute } from '@angular/router';



export class SortPreferences {

  sortAsc: string
  sortField: string

  constructor(

  ) { }
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  users: User[];

  constructor(
    private service: DataService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.service.getUsersPagable(0, 10, 'FirstName', '1').subscribe(data => {
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
