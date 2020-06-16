import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
  // editForm: FormGroup;
  mainForm: FormGroup;
  id: any;
  insertId: any = 13;

  constructor(
    private apisvc: ApiService,
    private router: Router,
    public formBuilder: FormBuilder,
    private actRoute: ActivatedRoute
  ) {
    // this.id = this.actRoute.snapshot.paramMap.get('id');

    // this.db.getUser(this.id).then(res => {
    //   this.mainForm.setValue({
    //     first_name: res['first_name'],
    //     last_name: res['last_name'],
    //     email: res['email'],
    //     avatar: res['avatar']
    //   })
    // })
  }

  ngOnInit() {
    this.mainForm = this.formBuilder.group({
      first_name: [''],
      last_name: [''],
      email: [''],
      avatar: ['']
    })
  }

  addUser() {
    this.apisvc.addUser(
      this.insertId,
      this.mainForm.value.first_name,
      this.mainForm.value.last_name,
      this.mainForm.value.email,
      this.mainForm.value.avatar,
    );
    this.insertId = this.insertId +1;
    this.mainForm.reset();
    this.router.navigate(['/users']);
  }
  // saveForm(){
  //   this.apisvc.updateUser(this.id, this.mainForm.value)
  //   .then( (res) => {
  //     console.log(res)
  //     this.router.navigate(['/users']);
  //   })
  // }
}
