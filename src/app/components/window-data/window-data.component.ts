import { Component, OnInit, Input } from '@angular/core';
import { User, DataService } from 'src/app/service/data.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-window-data',
  templateUrl: './window-data.component.html',
  styleUrls: ['./window-data.component.css']
})
export class WindowDataComponent implements OnInit {

  @Input() users: User[];
  role: boolean
  constructor(

    private service: DataService,
    private route: ActivatedRoute,
    private router: Router,
   
  ) { }

  ngOnInit(): void {


    if (localStorage.getItem('role') === 'Admin') {
      this.role = true;
    }
    else {
      this.role = false;
    }

  }

  peopleListChanged(): void {
    this.ngOnInit();
  }

  navigationToMore(id: string) {
    console.log("more" + id)

    this.router.navigate(['more', id])
  }
  delete(id) {

    console.log(id)
    this.service.deleteById(id).subscribe(
      response => {
        this.ngOnInit();
      }
    )
  }

}
