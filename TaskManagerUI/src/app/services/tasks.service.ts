import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Tasks } from '../models/task.model';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  baseApiUrl:string=environment.baseApiUrl;
  
  constructor(private http:HttpClient) { }

  getAllTasks(): Observable<Tasks[]>{
   return this.http.get<Tasks[]>(this.baseApiUrl+'/api/tasks')
 }

  addTasks(addTaskRequest:Tasks):Observable<Tasks>{
    addTaskRequest.id = '00000000-0000-0000-0000-000000000000';
    console.log( addTaskRequest.id );
    return this.http.post<Tasks>(this.baseApiUrl+'/api/tasks',addTaskRequest)
  }

  getTask(id:string):Observable<Tasks>{
    return this.http.get<Tasks>(this.baseApiUrl + '/api/tasks/'+ id)
  }

  updateTask(id:string, updateTaskRequest:Tasks):Observable<Tasks>{
    return this.http.put<Tasks>(this.baseApiUrl + '/api/tasks/'+id, updateTaskRequest)
  }

  deleteTask(id:string):Observable<Tasks>{
    return this.http.delete<Tasks>(this.baseApiUrl + '/api/tasks/'+id)
  }
}
