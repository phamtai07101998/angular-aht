import { Role } from './role';

export class Users{
    userId: number;
    userName: string;
    userMail: string;
    userPass: string;

    get getUserId(): number{
        return this.userId;
    }

    set setUserId(value: number){
        this.userId = value;
    }

    get getUserName(): string{
        return this.userName;
    }

    set setUserName(userName: string){
        this.userName = userName;
    }

    get getUserMail(): string{
        return this.userMail;
    }

    set setUserMail(userMail: string){
        this.userMail = userMail;
    }

    get getUserPass(): string{
        return this.userPass;
    }

    set setUserPass(userPass: string){
        this.userPass = userPass;
    }

}