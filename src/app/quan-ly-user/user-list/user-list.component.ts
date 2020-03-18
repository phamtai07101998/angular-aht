import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../service/user.service';
import { UserRoleService } from '../../service/user-role.service';
import { Observable } from 'rxjs';
import { Users } from 'src/app/model/user';
import { UserRole } from 'src/app/model/user-role';
import { Role } from 'src/app/model/role';
import { RoleService } from 'src/app/service/role.service';
import { error } from 'protractor';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: Observable<Users[]>;
  userRoleList: Observable<UserRole[]>;
  roles: Observable<Role[]>;
  userRole: UserRole = new UserRole();
  user: Users = new Users();
  roleSelectd: number;
  role: Role;
  idUser: number;
  idUserRole: number;

  constructor(private userService: UserService, private router: Router,
    private activatedRouter: ActivatedRoute, private userRoleService: UserRoleService,
    private roleService: RoleService) { }

  ngOnInit() {

    //Tự refresh lại dữ liệu mà không phải load lại trang
    this.userRoleService.refersh.subscribe(
      () => {
        this.load();
      });
    this.load();
    this.loadRole();
  }

  private load() {
    // this.users = this.userService.getUserList();
    this.userRoleList = this.userRoleService.getUserRoleList();
  }

  loadRole() {
    this.roles = this.roleService.getRole();
  }

  findUser(id: number) {
    this.userRoleService.getUserRoleId(id).subscribe(
      data => {
        console.log(data); this.userRole = data;
        this.roleSelectd = this.userRole.role.roleId;
        this.idUser = this.userRole.user.userId;
        this.user = this.userRole.user;
      }, error => console.log(error)
    )

    this.idUserRole = id;
  }

  deleteUser(id: number) {
    this.userRoleService.deleteUserRole(id).subscribe(
      data => {
        console.log(data);
      }, error => console.log(error)
    )
    this.load();
  }

  async createUser() {

    //Vì do bị bất đồng bộ nên phải dùng Promise để lấy id user vừa mới tạo
    let id = new Promise((resolve) => {
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

  updateUser() {
    // this.userService.updateUser(this.idUser,this.userRole.user).subscribe(
    //   data => console.log(data), error => console.log(error)
    // );

    this.role = new Role();
    this.role.setRoleId = this.roleSelectd;


    this.user = new Users();
    this.user.setUserId = this.idUser;


    this.userRole = new UserRole();
    this.userRole.setUser = this.user;
    this.userRole.setRole = this.role;

    this.userRoleService.updateUserRole(this.idUserRole, this.userRole).subscribe(
      data => {
        console.log(data)
      }, error => console.log(error)
    );
  }

  onSubmit() {
    this.createUser();
  }
}
