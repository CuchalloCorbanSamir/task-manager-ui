import { Routes } from '@angular/router';

import { Login } from './pages/login/login';
import { Dashboard } from './pages/dashboard/dashboard';
import { TaskList } from './pages/tasks/task-list/task-list';
import { TaskForm } from './pages/tasks/task-form/task-form';

import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: Login
  },
  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [authGuard]
  },
  {
    path: 'tasks',
    component: TaskList,
    canActivate: [authGuard]
  },
  {
    path: 'tasks/new',
    component: TaskForm,
    canActivate: [authGuard]
  },
  {
    path: 'tasks/edit/:id',
    component: TaskForm,
    canActivate: [authGuard]
  }
];