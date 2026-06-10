import {
  Component,
  OnInit
} from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import {
  Router,
  ActivatedRoute
 } from '@angular/router';

import { CommonModule } from '@angular/common';

import { TaskService } from '../../../core/services/task';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './task-form.html',
  styleUrl: './task-form.css',
})
export class TaskForm
  implements OnInit {

  taskForm: FormGroup;
  taskId: number | null = null;

  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute
  ) {

    this.taskForm =
      this.fb.group({

        title: [
          '',
          [
            Validators.required,
            Validators.maxLength(100)
          ]
        ],

        completed: [false]

      });

  }

  ngOnInit(): void {

    const id =
      this.route.snapshot.paramMap.get('id');

    if (id) {

      this.isEditMode = true;

      this.taskId = Number(id);

      this.loadTask();

    }

  }

  loadTask(): void {

    if (!this.taskId) {

      return;

    }

    this.taskService
      .getTaskById(this.taskId)
      .subscribe({

        next: task => {

          this.taskForm.patchValue({

            title: task.title,

            completed: task.completed

          });

        },

        error: err => {

          console.error(
            'Error cargando tarea',
            err
          );

        }

      });

  }

  onSubmit(): void {

    if (this.taskForm.invalid) {

      this.taskForm.markAllAsTouched();

      return;

    }

    if (this.isEditMode) {

      this.updateTask();

    } else {

      this.createTask();

    }

  }

  createTask(): void {

    this.taskService
      .createTask(
        this.taskForm.value
      )
      .subscribe({

        next: () => {

          this.router.navigate(
            ['/tasks']
          );

        },

        error: err => {

          console.error(err);

        }

      });

  }

  updateTask(): void {

    if (!this.taskId) {

      return;

    }

    this.taskService
      .updateTask(
        this.taskId,
        this.taskForm.value
      )
      .subscribe({

        next: () => {

          this.router.navigate(
            ['/tasks']
          );

        },

        error: err => {

          console.error(err);

        }

      });

  }

  cancel(): void {

    this.router.navigate(
      ['/tasks']
    );

  }

}