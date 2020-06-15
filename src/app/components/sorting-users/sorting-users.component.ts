import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User, DataService } from 'src/app/service/data.service';
import { SortPreferences } from '../table/table.component';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-sorting-users',
  templateUrl: './sorting-users.component.html',
  styleUrls: ['./sorting-users.component.css']
})
export class SortingUsersComponent implements OnInit {


  @Output() userEmit = new EventEmitter<User[]>()
  users: User[];
  sortPreferences = new SortPreferences();
  id: string;
  role: boolean;
  numbers: number[];
  selectedNumberElementOnPage: number;
  numberOfUsers: number;
  actualPage: number;
  allPages: number[];
  take: number;
  skip: number;
  sorts: string[];
  sortAsc: string;
  fields: string[];
  sortField: string;

  constructor(private service: DataService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.selectedNumberElementOnPage = 10;
    this.numbers = [10, 25, 50]
    this.allPages = []
    this.actualPage = 1;
    this.skip = 0;
    this.take = this.selectedNumberElementOnPage;

    this.fields = ['FirstName', 'LastName']
    this.sorts = ['ascending', 'deascending']

    if (localStorage.getItem('sortField') !== null) {

      this.sortField = localStorage.getItem('sortField')
    }
    else {
      localStorage.setItem('sortField', 'FirstName')
      this.sortField = 'FirstName';
    }

    if (localStorage.getItem('sortAsc') !== null) {

      if (localStorage.getItem('sortAsc') === '0') {
        this.sortAsc = 'ascending';
      }
      else {
        
        this.sortAsc = 'deascending';
      }
    }
    else {
      localStorage.setItem('sortAsc', '1')
      this.sortAsc = '1'
    }

    if (localStorage.getItem('role') === 'Admin') {
      this.role = true;
    }
    else {
      this.role = false;
    }
    this.service.getNumberOfUsers().subscribe(data => {

      var number = data;
      var numberPage = 1;
      this.numberOfUsers = number['numberUsers']

      while ((this.numberOfUsers / this.selectedNumberElementOnPage) > (numberPage - 1)) {
        this.allPages.push(numberPage)
        numberPage++;
      }
    }, error => {
      console.log("Error while fetching users!");
      console.log(error);
    })

    this.id = this.route.snapshot.params['id'];
    this.service.getUsersPagable(0, this.selectedNumberElementOnPage, localStorage.getItem('sortField'), localStorage.getItem('sortAsc')).subscribe(data => {
      this.users = data;

      console.log('refresh');
    }, error => {
      console.log("Error while fetching users!");
      console.log(error);
    })
  }

  update() {

    this.service.getUsersPagable(this.skip, this.take, localStorage.getItem('sortField'), localStorage.getItem('sortAsc')).subscribe(data => {

      this.userEmit.emit(data)
    }, error => {
      console.log("Error while fetching users!");
      console.log(error);
    })
    var numberPage = 1;
    this.allPages = [];
    while ((this.numberOfUsers / this.selectedNumberElementOnPage) > (numberPage - 1)) {
      this.allPages.push(numberPage)
      numberPage++;
    }
  }

  onEditClick() {
    console.log(this.selectedNumberElementOnPage)
    this.actualPage = 1;
    this.skip = 0;
    this.take = this.selectedNumberElementOnPage;

    if (this.sortAsc === 'ascending') {
      localStorage.setItem('sortAsc', '0')
    }
    else {

      localStorage.setItem('sortAsc', '1')
    }

    if (this.sortField === 'FirstName') {
      localStorage.setItem('sortField', 'FirstName')
    }
    else {
      localStorage.setItem('sortField', 'LastName')
    }

    this.update()

  }
  updateUser(id) {

    console.log(`update ${id}`)
    this.router.navigate(['update', id])
  }

  addNewUser(): void {
    this.router.navigate(['add'])
  }

  checkBold(item) {

    if (this.actualPage === item) { return true; }
    else {
      return false;
    }
  }
  checkNonBold(item) {

    if (this.actualPage !== item) { return true; }
    else {
      return false;
    }
  }
  nextPage() {

    if (this.actualPage < this.allPages.length) {

      this.skip = this.skip + this.selectedNumberElementOnPage;
      this.take = this.take + this.selectedNumberElementOnPage;
      this.actualPage++;
      this.update()
    }
  }
  previousPage() {
    if (this.actualPage > 0) {

      this.skip = this.skip - this.selectedNumberElementOnPage;
      this.take = this.take - this.selectedNumberElementOnPage;
      this.actualPage--;
      this.update()
    }
  }
  defaultSort() {
    localStorage.setItem('sortField', 'FirstName')
    localStorage.setItem('sortAsc', '0')
    this.sortField = 'FirstName';
    this.sortAsc = 'ascending'
    this.update()
  }

}
