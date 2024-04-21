import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tasks } from 'src/app/models/task.model';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent {
  taskDetails: Tasks = {
    id:'',
    title: '',
    description: '',
    dueDate: new Date()
  }
  isEditMode: boolean = false;

  constructor(private route:ActivatedRoute, private taskService:TasksService,private router:Router, private eventEmitterService: TasksService){}

  ngOnInit():void{

     this.route.paramMap.subscribe({
       next:(params) => {
        const id = params.get('id');

        if(id){
           this.taskService.getTask(id)
           .subscribe({
            next:(response) => {
                 this.taskDetails = response;
               console.log("Dar:",this.taskDetails)
            }
           })
          }
        }
     })
 
  }
}
