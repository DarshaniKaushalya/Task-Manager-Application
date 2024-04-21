import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TasksService } from 'src/app/services/tasks.service';
import { Router } from '@angular/router';
import { Tasks } from 'src/app/models/task.model';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent {
  addForm: FormGroup;
  isUpdateMode: boolean = false;
  addtaskerror:boolean = false;
  submitted:boolean = false;

  addTaskRequest:Tasks ={
  id:'',
  title: '',
  description: '',
  dueDate: new Date()
 }

 taskDetails: Tasks = {
  id:'',
  title: '',
  description: '',
  dueDate: new Date()
}

  constructor(private taskService: TasksService, private route: ActivatedRoute,private router:Router, private formBuilder:FormBuilder) { 
   
    this.addForm = new FormGroup({
      'title': new FormControl(),
      'description': new FormControl(),
      'dueDate': new FormControl(),
  
    })
  
    this.addForm = this.formBuilder.group(
      {
        id: [''],
        title: ['', [Validators.required]],
        description: ['', [Validators.required]],
        dueDate: ['', [Validators.required]],
      }
    )
  }

ngOnInit(): void {
  this.route.paramMap.subscribe({
    next: (params) => {
      const id = params.get('id');
      if (id) {
        this.taskService.getTask(id)
          .subscribe({
            next: (response) => {
              this.taskDetails = response;
              this.addForm.patchValue(response); // Patch form values with retrieved task data
            }
          });
        this.isUpdateMode = true;
      }
    }
  });
}

addTasks() {
  this.submitted = true;
  if (this.addForm.valid) {
    this.taskService.addTasks(this.addForm.value as Tasks)
      .subscribe({
        next: (tasks) => {
          this.router.navigate(['tasks']);
          console.log("tasksTwo",tasks)
        }
      });
      console.log("tasksOne",this.addForm.value)
  } else {
    this.addtaskerror = true;
  }
}

updateTask() {
  this.submitted = true;
  if (this.addForm.valid) {
    this.taskService.updateTask(this.taskDetails.id, this.addForm.value as Tasks)
    .subscribe({
      next: (response) => {
        this.router.navigate(['tasks']);
      }
    });
  }else{
    
  }

 }
}
