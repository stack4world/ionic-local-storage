import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { User } from 'src/app/models/user';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  headers = new HttpHeaders();
  userData: any = [];
  dbState: boolean = false;
  getHeader(){
    this.headers.append("Accept", 'application/json');
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Access-Control-Allow-Origin', '*');
    return this.headers;
  }

  constructor( 
    private platform: Platform, 
    private httpClient: HttpClient,
    private storage: Storage
    ) {
      this.platform.ready().then(() => {
        this.getOnlineData();
      });
     }
  ngOnInit() {}
   
  getOnlineData() {
    console.log(this.dbState);
    if(this.dbState) {
      this.storage.get('userdata').then((userdata) => {
        this.userData = userdata;
      });
    }else {
      this.httpClient.get(`https://reqres.in/api/users?page=2`, {headers:this.getHeader(), observe:'response'}).subscribe(data => {
        if (!data) {
          console.log('Not connected to server.');
          this.storage.get('userdata').then((userdata) => {
            this.userData = userdata;
          });
          // this.getUsers();
        }
        else {
          console.log('Connected to server!');
          this.userData = data.body['data'];
          this.storage.set('userdata', this.userData).then(() => {
            console.log('Saved online data to local storage.');
            this.dbState = true;
          });
        }
      });
    }
  }
  
    // Get list
  getUsers(){
    return this.userData;
  }

  getDbstate() {
    return this.dbState;
  }

  // Add
  addUser(id, first_name, last_name, email, avatar) {
    let data = {'id': id, 'first_name': first_name, 'last_name': last_name, 'email': email, 'avatar': avatar};
    this.userData.push(data);
    this.storage.remove('userdata').then(() => {
    });
    this.storage.set('userdata', this.userData).then(() => {
      console.log('Saved a user to local storage.');
    });
    return this.userData;
  }
  
  // // Get single object
  // getUser(id): Promise<User> {
  //   return this.storage.executeSql('SELECT * FROM usertable WHERE id = ?', [id]).then(res => { 
  //     return {
  //       id: res.rows.item(0).id,
  //       first_name: res.rows.item(0).first_name,  
  //       last_name: res.rows.item(0).last_name,
  //       email: res.rows.item(0).email,
  //       avatar: res.rows.item(0).avatar,
  //     }
  //   });
  // }

  // Update
  // updateUser(id, user: User) {
  //   let data = [user.first_name, user.last_name,user.email, user.avatar];
  //   return this.storage.executeSql(`UPDATE usertable SET first_name = ?, last_name = ?, email = ?, avatar = ? WHERE id = ${id}`, data)
  //   .then(data => {
  //     this.getUsers();
  //   })
  // }

  // Delete
  // deleteUser(id) {
  //   return this.storage.executeSql('DELETE FROM usertable WHERE id = ?', [id])
  //   .then(_ => {
  //     this.getUsers();
  //   });
  // }

  // getUsers(){
  //   return this._http.get(`https://reqres.in/api/users?page=2`, {headers:this.getHeader(), observe:'response'});
  // }
}
