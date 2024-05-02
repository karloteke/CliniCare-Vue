
import { useLoginStore } from './loginStore'; 
import type { NavigationGuardNext, RouteLocationNormalized, NavigationGuard } from 'vue-router';

const isAuthenticated = () => {
  const { isLoggedIn } = useLoginStore();
  return isLoggedIn();
};

//Si no estoy logueado lleva al Login
const authGuard: NavigationGuard = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  if (isAuthenticated()) {
    next();
  } else {
    next('/login');
  }
};

export default authGuard;

