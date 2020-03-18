export class Role{
    roleId: number;
    roleName: string;

    get getRoleId(): number{
        return this.roleId;
    }

    set setRoleId(roleId: number){
        this.roleId = roleId;
    }

    get getRoleName(): string{
        return this.roleName;
    }

    set setRoleName(roleName: string){
        this.roleName = roleName;
    }
}