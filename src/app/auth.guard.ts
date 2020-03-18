import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from './auth/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private token: TokenStorageService, private router: Router){}
  canActivate(): boolean{
    if(this.token.getToken()){
      return true;
    }else{
      this.router.navigate(['/login'])
      return false
    }
  }
  
}
