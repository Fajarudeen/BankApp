import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';

const options={
  headers:new HttpHeaders
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private api:HttpClient) { }

// login api -asynchronous
login(acno:any,pswd:any){
  const body={
    acno,
    pswd
  }
  return this.api.post('http://localhost:3000/login',body)
}

// register api -asynchronous
register(acno:any,pswd:any,uname:any){
  const body={
    acno,
    pswd,
    uname
  }
  return this.api.post('http://localhost:3000/register',body)
}

// to insert token in a http header
getToken(){
  // 1.get token from localsorage
  const token=localStorage.getItem("token")
  // 2.create http header
  let headers=new HttpHeaders()
// to insert token inside header
if (token) {
  headers=headers.append("access-token",token)
// to achieve function overloading
  options.headers=headers
}
return options
}

// deposite api 
deposite(acno:any,pswd:any,amount:any){
  const body={
    acno,
    pswd,
    amount
  }
  return this.api.post('http://localhost:3000/deposite',body,this.getToken())
}

// withdraw api 
withdraw(acno:any,pswd:any,amount:any){
  const body={
    acno,
    pswd,
    amount
  }
  return this.api.post('http://localhost:3000/withdraw',body,this.getToken())
}

// transaction api-asynchronous
transaction(acno:any){
  return this.api.get('http://localhost:3000/transaction/'+acno,this.getToken())
}

// delete API -asynchronous
deleteAcc(acno:any){
  return this.api.delete('http://localhost:3000/deleteAcno/'+acno,this.getToken())
}


}
