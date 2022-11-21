import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { TaskResponse } from 'src/app/core/models/project-manager.model';

@Injectable({
  providedIn: 'root',
})

export class EditTaskServie {
  private task$$ = new Subject<TaskResponse>();

  private taskSet$$ = new Subject<any>();

  private openEditModal$$ = new Subject<boolean>();

  private taskData$$ = new Subject<any>();

  private users$$ = new BehaviorSubject<string[]>([]);

  task$ = this.task$$.asObservable();

  taskSet$ = this.taskSet$$.asObservable();

  openEditModal$ = this.openEditModal$$.asObservable();

  taskData$ = this.taskData$$.asObservable();

  users$ = this.users$$.asObservable();

  getTaskData(idT:string, usersT: string[]) {
    const taskData = {
      id: idT,
      users: usersT,
    };
    this.taskData$$.next(taskData);
  }

  getTask(task:TaskResponse) {
    return this.task$$.next(task);
  }

  setTask(idT:string, usersT: string[]) {
    const taskData = {
      id: idT,
      users: usersT,
    };

    return this.taskSet$$.next(taskData);
  }

  openEditMpdal(isEditTask: boolean) {
    return this.openEditModal$$.next(isEditTask);
  }
}
