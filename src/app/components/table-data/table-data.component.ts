import { Component, OnInit, Input } from '@angular/core';
import { DataService, User } from 'src/app/service/data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SortPreferences } from '../table/table.component';

@Component({
  selector: 'app-table-data',
  templateUrl: './table-data.component.html',
  styleUrls: ['./table-data.component.css']
})
export class TableDataComponent implements OnInit {

  
  @Input() users: User[];
  role: boolean;

  constructor(
    private service: DataService,
    private router: Router,
    private route: ActivatedRoute
  ) { }
  ngOnInit(): void {

    if (localStorage.getItem('role') === 'Admin') {
      this.role = true;
     }
     else {
      this.role = false;
     }
  }
  deleteUser(id) {

    this.service.deleteById(id).subscribe(
      response => {
     var position = this.users.findIndex(x => x.userId === id);
     this.users.splice(position, 1);
       
     this.ngOnInit();
      }
    )

  }

  updateUser(id) {

    console.log(`update ${id}`)
    this.router.navigate(['update', id])
  }
  addNewUser(): void {
    this.router.navigate(['add'])
  }


}
