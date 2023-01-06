import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user:String="";

  // to hold account to be deleted
  acno:any;

  depositeForm=this.fb.group({
    pswd:['',[Validators.required,Validators.pattern('[a-z A-Z 0-9]*')]],
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    amount:['',[Validators.required,Validators.pattern('[0-9]*')]]
  })

  withdrawForm=this.fb.group({
    pswd:['',[Validators.required,Validators.pattern('[a-z A-Z 0-9]*')]],
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    amount:['',[Validators.required,Validators.pattern('[0-9]*')]]
  })


  constructor(private fb:FormBuilder,private router:Router,private api:ApiService) { }

  ngOnInit(): void {
    if (localStorage.getItem("username")) {
      this.user=localStorage.getItem("username") || ''
      console.log(this.user);
    }
    if (!localStorage.getItem("token")) {
      alert('Please Log In')
      // redirect to login page
      this.router.navigateByUrl('')
    }
  }

  deposite(){
    var acno=this.depositeForm.value.acno
    var pswd=this.depositeForm.value.pswd
    var amount=this.depositeForm.value.amount
    if (this.depositeForm.valid) {
       // asynchronous
       this.api.deposite(acno,pswd,amount)
       .subscribe((result:any)=>{
       alert(result.message);
       },
       // if client error 4xx
       (result:any)=>{
         alert(result.error.message)
       }
       )
    }
    else{
      alert('Invalid Form')
    }
  }

  // withdrawal



  withdraw(){
    var acno=this.withdrawForm.value.acno
    var pswd=this.withdrawForm.value.pswd
    var amount=this.withdrawForm.value.amount
    if (this.withdrawForm.valid) {
       // asynchronous
       this.api.withdraw(acno,pswd,amount)
       .subscribe((result:any)=>{
       alert(result.message);
       },
       // if client error 4xx
       (result:any)=>{
         alert(result.error.message)
       }
       )
    }
    else{
      alert('Invalid Form')
    }
  }
  // logout
  logout(){
    // remove existing user details from local storage
    localStorage.removeItem("username")
    localStorage.removeItem("token")
    localStorage.removeItem("currentAcno")

    // redirect to login page
    this.router.navigateByUrl('')

  }

  // delete - to display the delete confirmation
  delete(){
    this.acno=localStorage.getItem("currentAcno")
  }

  // onDelete - to delete acc
  onDelete(event:any){
    this.api.deleteAcc(event)
    .subscribe((result:any)=>{
      alert(result.message)
      this.logout()
    },
    result=>{
      alert(result.error.message)
    }
    )
  }

  // cancel()
  cancel(){
    this.acno=""
  }

}
