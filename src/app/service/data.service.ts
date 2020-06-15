import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { PostUser } from '../components/add-user/add-user.component';
import  {LoginCredentail}  from '../components/login/login.component';
import { SortPreferences } from '../components/table/table.component';

export class User {

  userId: string
  firstName: string
  lastName: string
  photoPath: string
  token: string
  role: string
  constructor(

    userId: string,
    firstName: string,
    lastName: string,
    photoPath: string,
    token: string,
    role: string
  ) { }
}

export class NumberOfUsers {

  numberOfUser: string
 
  constructor(
  
    
  ) { }
}



@Injectable({
  providedIn: 'root'
})
export class DataService {

  url = 'http://localhost:5000/user/';
  token = 'Bearer '+ localStorage.getItem('token');

  constructor(
    private http: HttpClient) {
  }
 
  login(loginCredentail :LoginCredentail): Observable<User> {

    var val = this.http.post<User>(this.url + 'authenticate',loginCredentail);
    return val;
  }

  getUsersPagable( take:number, skip:number,sortField:string,ascend:string): Observable<User[]> {
    var val = this.http.get<User[]>(this.url + 'sort/pagable/'+skip+'/'+take+'/'+sortField+'/'+ascend,{
      headers: {
        Authorization: this.token    
   }});
    return val;
  }

  getUsersToCsv(sortField:string,ascend:string): Observable<User[]> {

    var val = this.http.get<User[]>(this.url + 'csv/'+sortField+'/'+ascend,{
      headers: {
        Authorization: this.token    
   }});
 
   return val;
 
  } 
  getNumberOfUsers(): Observable<NumberOfUsers> {

    var val = this.http.get<NumberOfUsers>(this.url + 'number' ,{
      headers: {
        Authorization: this.token    
   }});
    return val;
  }

  getAllUsers(): Observable<User[]> {

    var val = this.http.get<User[]>(this.url + 'all' ,{
      headers: {
        Authorization: this.token    
   }});
    return val;
  }

  getUserById(userId: string): Observable<User> {

    var path = this.url  + userId;
    var val = this.http.get<User>(path,{
      headers: {
        Authorization: this.token    
   }});
    return val;
  }

  updateUserById(user: User) {

    var val = this.http.put<User>(this.url, user,{
      headers: {
        Authorization: this.token    
   }});
    return val;

  }

  addUser(user: PostUser) {

    var val = this.http.post<User>(this.url, user,{
      headers: {
        Authorization: this.token    
   }});
    return val;

  }

  deleteById(userId: string) {

    var path = this.url+'delete/' + userId;

    var val = this.http.delete<User>(path,{
      headers: {
        Authorization: this.token    
   }});
    return val;

  }
}
