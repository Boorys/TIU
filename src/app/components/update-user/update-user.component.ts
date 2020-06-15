import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService, User } from 'src/app/service/data.service';


@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  personId: string
  user: User
  firstName: string
  lastName: string
 
constructor(
    
    private route: ActivatedRoute,
    private dataService: DataService,
    private router: Router,
    ) { }

  ngOnInit(): void {

    this.personId = this.route.snapshot.params['id'];
    this.dataService.getUserById(this.personId).subscribe(data => {
     
      this.user=data;
      this.firstName = data.firstName
      this.lastName = data.lastName

    }, error => {
      console.log(error);   
    })

  }

  handleLogin() {

    this.user.lastName = this.lastName
    this.user.firstName = this.firstName 
   
    this.dataService.updateUserById(this.user).subscribe(response => {
     
    }, error => {
      
      console.log(error);
    })
      this.redirectTo('table')
  }

  redirectTo(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
 }

}
