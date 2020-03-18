import { Component, OnInit } from '@angular/core';
import { Users } from 'src/app/model/user';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../service/user.service';
import { UserRole } from 'src/app/model/user-role';
import { UserRoleService } from '../../service/user-role.service';
import { Role } from 'src/app/model/role';
import { RoleService } from '../../service/role.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {
  userRole: UserRole;
  user: Users;
  id: number;
  idUser: number;
  roles: Observable<Role[]>;
  role: Role;
  roleSelectd: number;
  roleName: string;
  userName: string;
  constructor(private roleService: RoleService, private router: Router, private userService: UserService,
    private activatedRoute: ActivatedRoute, private userRoleService: UserRoleService) {
      
     }

  ngOnInit() {
    this.userRole = new UserRole();
    this.user = new Users();
    this.role = new Role();
    this.id = this.activatedRoute.snapshot.params['id'];
    this.userRoleService.getUserRoleId(this.id).subscribe(
      data => {
        console.log(data); this.userRole = data;
        this.idUser = this.userRole.user.userId;
        this.roleSelectd = this.userRole.role.roleId;
        this.userName = this.userRole.user.userName;
      }, error => console.log(error)
    )
    
    this.loadRole();
    
  }

  loadRole() {
    this.roles = this.roleService.getRole();
  }

  updateUser() {
    this.userService.updateUser(this.idUser,this.userRole.user).subscribe(
      data => console.log(data), error => console.log(error)
    );

    this.role = new Role();
    this.role.setRoleId = this.roleSelectd;

    this.user = new Users();
    this.user.setUserId = this.idUser;
    

    this.userRole = new UserRole();
    this.userRole.setUser = this.user;
    this.userRole.setRole = this.role;

    this.userRoleService.updateUserRole(this.id, this.userRole).subscribe(
      data => {
        console.log(data)
      }, error => console.log(error)
    );

    console.log(this.userRole);
  }

  listUser() {
    this.router.navigate(['/user']);
  }

  onSubmit() {
    this.updateUser();
    this.listUser();
  }

}
