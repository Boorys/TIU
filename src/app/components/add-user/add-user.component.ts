import { Component, OnInit } from '@angular/core';
import { DataService, User } from 'src/app/service/data.service';
import { Router, ActivatedRoute } from '@angular/router';

export class Photo {

  man: string
  woman: string
  worker: string
  cyclist: string

  constructor() {
    this.man= 'https://image.shutterstock.com/image-photo/isolated-shot-young-handsome-male-600w-762790210.jpg'

    this.woman= 'https://image.shutterstock.com/image-photo/happy-cheerful-young-woman-wearing-600w-613759379.jpg'

    this.worker= 'https://cdn.pixabay.com/photo/2015/05/15/14/36/person-768582_960_720.jpg'

    this.cyclist= 'https://cdn.pixabay.com/photo/2016/07/21/18/40/cycling-1533270_960_720.jpg'
  }
}

export class PostUser {

  firstName: string
  lastName: string
  photoPath: string

  constructor(firstName: string, lastName: string, photoPath: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.photoPath = photoPath;
  }
}

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  firstName: string
  lastName: string
  photoPath: string

  constructor(

    private dataService: DataService,
    private router: Router,

  ) {
  }

  ngOnInit(): void {
  }

  handleLogin() {

    var photo = new Photo();

    if (this.photoPath === 'man') {
      console.log(photo.man)
      this.photoPath = photo.man;
    }
    else if (this.photoPath === 'woman') {
      this.photoPath = photo.woman;
    }
    else if (this.photoPath === 'worker') {
      this.photoPath = photo.worker;
    }
    else if (this.photoPath === 'cyclist') {
      this.photoPath = photo.cyclist;
    }

    var user = new PostUser(this.firstName, this.lastName, this.photoPath)

    this.dataService.addUser(user).subscribe(response => {

    }, error => {

      console.log(error);
    })
    this.router.navigate(['table'])
  }
}
