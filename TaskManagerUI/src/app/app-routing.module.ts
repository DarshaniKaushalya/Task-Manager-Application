import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksListComponent } from './components/Tasks/tasks-list/tasks-list.component';
import { AddTaskComponent } from './components/Tasks/add-task/add-task.component';
import { EditTaskComponent } from './components/Tasks/edit-task/edit-task.component';
import { TaskDetailsComponent } from './components/Tasks/task-details/task-details.component';
import { WarningPopupComponent } from './components/Tasks/warning-popup/warning-popup.component';
import { TaskFormComponent } from './components/Tasks/task-form/task-form.component';

const routes: Routes = [
  {
    path:'',
    component:TasksListComponent
  },
  {
    path:'tasks',
    component:TasksListComponent
  },
  // {
  //   path:'tasks/add',
  //   component:AddTaskComponent
  // },
  // {
  //   path:'tasks/edit/:id',
  //   component:EditTaskComponent
  // },
  {
    path:'tasks/:id',
    component:TaskDetailsComponent
  },
  {
    path:'tasks/delete/:id',
    component:WarningPopupComponent
  },
  {
    path:'tasks-form',
    component:TaskFormComponent
  },
  {
    path:'tasks-form/edit/:id',
    component:TaskFormComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
