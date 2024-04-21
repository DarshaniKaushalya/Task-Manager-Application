import { Component, OnInit } from '@angular/core';
import { Tasks } from 'src/app/models/task.model';
import { TasksService } from 'src/app/services/tasks.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-warning-popup',
  templateUrl: './warning-popup.component.html',
  styleUrls: ['./warning-popup.component.css']
})
export class WarningPopupComponent {
  tasks: Tasks[] = [];
  isEdit:boolean = false;
  taskDetails: Tasks = {
    id:'',
    title: '',
    description: '',
    dueDate: new Date()
  }
  showDeleteConfirmation: boolean = false;

  constructor(private route:ActivatedRoute,private tasksService:TasksService,private eventEmitterService: TasksService,private taskService:TasksService,private router:Router){}

  ngOnInit(): void {
      this.route.paramMap.subscribe({
        next:(params) => {
         const id = params.get('id');
 
         if(id){
            this.taskService.getTask(id)
            .subscribe({
             next:(response) => {
                  this.taskDetails = response;
             }
            })
              }
            }
      })
  }
  deleteTask(id:string){
    this.taskService.deleteTask(id)
    .subscribe({
      next: (response) => {
        this.router.navigate(['tasks']);
      }
    })
  }

  hideDeletePopup() {
    this.showDeleteConfirmation = false;
  }
  cancelDelete() {
    this.hideDeletePopup();
    this.router.navigate(['tasks']);
  }

}
