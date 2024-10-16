import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/login.service';

export const authGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);
  const router = inject(Router);

    if (!loginService.ngOnInit) {// user logged in  before
      return router.createUrlTree(["/login"]);
    }
    else {
      return true;
    }

};
