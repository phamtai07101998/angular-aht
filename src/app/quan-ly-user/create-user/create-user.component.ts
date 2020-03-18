import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../service/user.service';
import { from, Observable } from 'rxjs';
import { Users } from 'src/app/model/user';
import { UserRole } from 'src/app/model/user-role';
import {UserRoleService} from '../../service/user-role.service';
import { Role } from 'src/app/model/role';
import {RoleService} from '../../service/role.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { resolve } from 'url';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  roles: Observable<Role[]>;
  userRole: UserRole = new UserRole();
  user: Users = new Users();
  roleSelectd: number;
  role: Role;
  idUser: number;
  nameUser: string;
  constructor(private router: Router, private userService: UserService,
    private userRoleService: UserRoleService, private roleService: RoleService) { }

  ngOnInit() {
    this.loadRole();
  }

  loadRole() {
    this.roles = this.roleService.getRole();
  }


  listUser(){
    this.router.navigate(['/user']);
  }

  async createUser(){
    // let num = new Promise((resolve)=>{
    //   this.userService.getUserId(10).subscribe(
    //     (Users) => {
    //       resolve(Users.userId);
    //     }
    //   )
    // })
    // this.idUser = Number(await num);
    // console.log(this.idUser);

    //Vì do bị bất đồng bộ nên phải dùng Promise để lấy id user vừa mới tạo
    let id = new Promise((resolve) =>{
      this.userService.createUser(this.user).subscribe(
        Users => {
            resolve(Users.userId);
        }
      )
    })

    this.idUser = Number(await id);
    console.log(this.idUser);

    this.user = new Users();
    this.user.setUserId = this.idUser;

    this.role = new Role();
    this.role.setRoleId = this.roleSelectd;

    this.userRole = new UserRole();
    this.userRole.setRole = this.role;
    this.userRole.setUser = this.user;
    
    this.userRoleService.createUserRole(this.userRole).subscribe(
      data => console.log(data), error => console.log(error)
    )
    
  }

  onSubmit(){
    this.createUser();
    this.listUser();
  }
}
