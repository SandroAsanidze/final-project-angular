import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const isAdminTrue = localStorage.getItem('isAdmin');
  const router = inject(Router)

  if(isAdminTrue === 'true') {
    return true;
  }
  else {
    router.navigate(['home']);
    return false;
  }
};



export const authGuard1: CanActivateFn = (route, state) => {
  const isAdminTrue = localStorage.getItem('isAdmin');
  const router = inject(Router)

  if(isAdminTrue === 'true') {
    router.navigate(['home']);
    return false;
  }
  else {
    return true;
  }
};
