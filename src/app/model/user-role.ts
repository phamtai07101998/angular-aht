import { Users } from './user';
import { Role } from './role';

export class UserRole{
    userRoleId: number;
    user: Users;
    role: Role;

    get getUser(): any{
        return this.user;
    }

    set setUser(user: any){
        this.user = user;
    }

    get getRole(): any{
        return this.role;
    }

    set setRole(role: any){
        this.role = role;
    }

    get getUserRoleId(): number{
        return this.userRoleId;
    }

    set setUserRoleId(userRoleId: number){
        this.userRoleId = userRoleId;
    }
}