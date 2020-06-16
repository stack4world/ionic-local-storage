import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { ApiService } from 'src/app/services/api.service';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router'
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {

  users = [];
  user = {};

  constructor( private apisvc: ApiService,private router: Router, private navCorl: NavController,private route: ActivatedRoute) {
   }

  ngOnInit() {
    this.users = this.apisvc.getUsers();
    console.log(this.users);
  }
  addUser() {
    this.router.navigate(['/user']);
  }
  // deleteUser(id){
  //   this.apisvc.deleteUser(id).then(async(res) => {
  //     let toast = await this.toast.create({
  //       message: 'User deleted',
  //       duration: 2500
  //     });
  //     toast.present();      
  //   })
  // }

}
