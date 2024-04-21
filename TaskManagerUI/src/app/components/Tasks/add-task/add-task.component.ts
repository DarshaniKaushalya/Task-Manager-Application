import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Tasks } from 'src/app/models/task.model';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent {
addForm: FormGroup;
addtaskerror:boolean = false;
submitted:boolean = false;
 addTaskRequest:Tasks ={
  id:'',
  title: '',
  description: '',
  dueDate: new Date()
 }
 constructor(private taskService:TasksService,private router:Router, private formBuilder:FormBuilder){
  this.addForm = new FormGroup({
    'title': new FormControl(),
    'description': new FormControl(),
    'dueDate': new FormControl(),

  })

  this.addForm = this.formBuilder.group(
    {
      title:["",[Validators.required]],
      description:["",[Validators.required]],
      dueDate:["",[Validators.required]],
    }
  )
 }
  ngOnInit():void{
   
  }
  get f(){
    return this.addForm.controls;
  }

addTasks(){
  this.submitted = true;
  if(this.addForm.valid){
    this.taskService.addTasks(this.addTaskRequest)
   .subscribe({
     next:(tasks) => {
      this.router.navigate(['tasks']);
    }
   })
  }else{
    this.addtaskerror = true;
  }
}
}
