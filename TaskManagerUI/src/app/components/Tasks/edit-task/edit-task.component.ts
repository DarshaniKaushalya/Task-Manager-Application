import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tasks } from 'src/app/models/task.model';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent {

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
                 console.log("One One",this.taskDetails)
            }
           })
           console.log("Two Two",this.taskDetails)
             }
           }
     })
 
  }
  UpdateTask(){
    this.taskService.updateTask(this.taskDetails.id, this.taskDetails)
    .subscribe({
      next: (response) => {
        this.router.navigate(['tasks']);
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
}
