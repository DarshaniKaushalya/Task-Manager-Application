import { Component, OnInit } from '@angular/core';
import { Tasks } from 'src/app/models/task.model';
import { TasksService } from 'src/app/services/tasks.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css']
})
export class TasksListComponent implements OnInit{
  tasks: Tasks[] = [];
  isEdit:boolean = false;
  taskDetails: Tasks = {
    id:'',
    title: '',
    description: '',
    dueDate: new Date()
  }
  constructor(private route:ActivatedRoute,private tasksService:TasksService,private eventEmitterService: TasksService,private taskService:TasksService,private router:Router){}

  ngOnInit(): void {
    this.tasksService.getAllTasks()
      .subscribe({
        next:(tasks) =>{
          this.tasks = tasks;
          console.log(tasks);
        },
        error:(response)=>{
          console.log("My all tasks",response);
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
