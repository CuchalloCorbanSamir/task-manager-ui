import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { TaskService } from '../../../core/services/task';

import { Task } from '../../../core/models/task.model';

import { RouterModule } from '@angular/router';

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
})
export class TaskList implements OnInit {

  tasks: Task[] = [];

  currentPage = 0;

  totalPages = 0;

  pageSize = 3;

  searchText = '';

  searchResults = 0;

  constructor(
    private taskService: TaskService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.loadTasks();

  }

  loadTasks(): void {

    this.taskService
      .getTasks(
        this.currentPage,
        this.pageSize)
      .subscribe({

        next: response => {

          this.tasks = [...response.content];

          this.totalPages = response.totalPages;

          this.cdr.detectChanges();

        },

        error: err => {

          console.error(
            'Error cargando tareas',
            err
          );

        }

      });

  }

  search(): void {

    const text =
      this.searchText.trim();

    if (!text) {

      this.loadTasks();

      return;

    }

    this.taskService
      .searchTasks(text)
      .subscribe({

        next: tasks => {

          this.tasks = tasks;
          this.searchResults = tasks.length;

        },

        error: err => {

          console.error(err);

        }

      });

  }

  clearSearch(): void {

    this.searchText = '';

    this.currentPage = 0;

    this.loadTasks();

  }

  deleteTask(id: number): void {

    const confirmed =
      confirm(
        '¿Desea eliminar esta tarea?'
      );

    if (!confirmed) {

      return;

    }

    this.taskService
      .deleteTask(id)
      .subscribe({

        next: () => {

          this.loadTasks();

        },

        error: err => {

          console.error(
            'Error eliminando tarea',
            err
          );

        }

      });

  }

  nextPage(): void {

    if (
      this.currentPage <
      this.totalPages - 1
    ) {

      this.currentPage++;

      this.loadTasks();

    }

  }

  previousPage(): void {

    if (
      this.currentPage > 0
    ) {

      this.currentPage--;

      this.loadTasks();

    }

  }

}