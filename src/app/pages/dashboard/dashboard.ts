import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { TaskService } from '../../core/services/task';

import { Task } from '../../core/models/task.model';

import { Router } from '@angular/router';

import { AuthService } from '../../core/services/auth.service';

import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {

  totalTasks = 0;

  completedTasks = 0;

  pendingTasks = 0;

  tasks: Task[] = [];

  constructor(
    private taskService: TaskService,
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.taskService
      .getTasks()
      .subscribe({

        next: response => {

          console.log('RESPUESTA API:', response);
          this.tasks = [...response.content];

          console.log('TASKS:', this.tasks);
          this.totalTasks = response.totalElements;

          console.log('TOTAL:', this.totalTasks);
          this.completedTasks =
            this.tasks.filter(
              t => t.completed
            ).length;

          console.log('COMPLETADAS:', this.completedTasks);
          console.log('PENDIENTES:', this.pendingTasks);

          this.pendingTasks =
            this.tasks.filter(
              t => !t.completed
            ).length;

          this.cdr.detectChanges();

        },

        error: err => {

          console.error('ERROR:', err);

        }

      });

  }

  logout(): void {

  this.authService.logout();

  this.router.navigate(
    ['/login']
  );

}

}