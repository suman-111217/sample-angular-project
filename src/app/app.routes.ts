import { Routes } from '@angular/router';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserAddComponent } from './user/user-add/user-add.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { authGuard } from './guards/auth.guard';
import { noAuthGuard } from './guards/no-auth.guard';

export const routes: Routes = [
    {
      path: '',
      canActivate: [noAuthGuard],
      loadComponent: () =>
        import('./auth/auth.component').then(m => m.AuthComponent)
    },
    {
      path: 'list',
      canActivate: [authGuard],
      loadComponent: () =>
        import('./user/user-list/user-list.component').then(m => m.UserListComponent)
    },
    {
      path: 'add',
      canActivate: [authGuard],
      loadComponent: () =>
        import('./user/user-add/user-add.component').then(m => m.UserAddComponent)
    },
    {
      path: 'edit/:id',
      canActivate: [authGuard],
      loadComponent: () =>
        import('./user/user-edit/user-edit.component').then(m => m.UserEditComponent)
    }
  ];
