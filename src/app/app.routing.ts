import { Routes, RouterModule, GuardsCheckEnd } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HopDongListComponent } from './danh-muc-hop-dong/hop-dong-list/hop-dong-list.component';
import { BoPhanListComponent } from './danh-muc-bo-phan/bo-phan-list/bo-phan-list.component';
import { PhongBanListComponent } from './danh-muc-phong-ban/phong-ban-list/phong-ban-list.component';
import { DaoTaoListComponent } from './danh-muc-khoa-dao-tao/dao-tao-list/dao-tao-list.component';
import { NhanSuListComponent } from './quan-ly-ho-so-nhan-su/nhan-su-list/nhan-su-list.component';
import { CreateUserComponent } from './quan-ly-user/create-user/create-user.component';
import { UserDetailsComponent } from './quan-ly-user/user-details/user-details.component';
import { UserListComponent } from './quan-ly-user/user-list/user-list.component';
import { UserUpdateComponent } from './quan-ly-user/user-update/user-update.component';
import { CreateRoleComponent } from './quan-ly-role/create-role/create-role.component';
import { ListRoleComponent } from './quan-ly-role/list-role/list-role.component';
import { UpdateRoleComponent } from './quan-ly-role/update-role/update-role.component';
import { TrainingEmpComponent } from './training-emp/training-emp.component';
import { NhanVienCtyComponent } from './bao-cao-quan-ly/nhan-vien-cty/nhan-vien-cty.component';
import { NhanVienThuViecComponent } from './bao-cao-quan-ly/nhan-vien-thu-viec/nhan-vien-thu-viec.component';
import { TrainingEmpDetailComponent } from './training-emp-detail/training-emp-detail.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';



const routes: Routes = [
    {path: 'user', component:UserListComponent, canActivate:[AuthGuard]},
      {path: 'user/add', component:CreateUserComponent , canActivate:[AuthGuard]},
      {path: 'user/update/:id', component:UserUpdateComponent , canActivate:[AuthGuard]},
      {path: 'contract', component:HopDongListComponent , canActivate:[AuthGuard]},
      {path: 'parts', component:BoPhanListComponent , canActivate:[AuthGuard]},
      {path: 'department', component:PhongBanListComponent , canActivate:[AuthGuard]},
      {path: 'training', component:DaoTaoListComponent , canActivate:[AuthGuard]},
      {path: 'daotao', component:TrainingEmpComponent , canActivate:[AuthGuard]},
      {path: 'nhansu', component:NhanSuListComponent , canActivate:[AuthGuard]},
      {path: 'nhan-vien-cty', component:NhanVienCtyComponent , canActivate:[AuthGuard]},
      {path: 'nhan-vien-thu-viec', component:NhanVienThuViecComponent , canActivate:[AuthGuard]},
      {path: 'daotao/detail/:id', component:TrainingEmpDetailComponent, canActivate:[AuthGuard]},
      {path:'login', component:LoginComponent},
      {path:'',redirectTo:'login', pathMatch:'full'}
];

export const appRoutingModule = RouterModule.forRoot(routes);