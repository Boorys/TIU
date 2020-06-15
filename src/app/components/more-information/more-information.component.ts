import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService, User } from 'src/app/service/data.service';

@Component({
  selector: 'app-more-information',
  templateUrl: './more-information.component.html',
  styleUrls: ['./more-information.component.css']
})
export class MoreInformationComponent implements OnInit {

  personId: string
  user: User

  constructor(

    private router: Router,
    private dataService: DataService,
    private route: ActivatedRoute,

  ) {}

  ngOnInit(): void {
  
    this.personId = this.route.snapshot.params['id'];
    this.dataService.getUserById(this.personId).subscribe(data => {
     
      this.user=data;
 
    }, error => {
      console.log(error);   
    })



  }







}
