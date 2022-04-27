import { Component, OnInit } from '@angular/core';
import { iTask } from '../core/interface/todo-list';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { Todolist } from '../core/todo-list/todolist';
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  taskForm = this.fb.group({
    name: new FormControl(null, [Validators.required, Validators.minLength(3) ])
  })
  Ivalues: iTask = {
    id: '',
    name: '',
    completed: false,
  };

  inputDivEdit: boolean = false;
  
  tasks: iTask[] = [
  ];
  
  constructor(private fb: FormBuilder) { 
  }

  ngOnInit(): void {
   this.getTask();
  }

  getTask(){
    return this.tasks;
  }

  addTask(tasksitem:iTask): unknown{
    this.taskForm.reset()
    return this.tasks.push(
      new Todolist(`list-${Math.random()}`,tasksitem.name, tasksitem.completed)
    );
  }

  deleteTask(taskitem:iTask): unknown{
    const listIndex = this.tasks.findIndex(list => list.id === taskitem.id);
    return this.tasks.splice(listIndex, 1);
    ;
  }

  addStatus(taskitem:iTask, event:any){
    console.log(event.target.checked)
    const listIndex = this.tasks.findIndex(list => list.id === taskitem.id);
    console.log(this.tasks)
    return this.tasks[listIndex].completed = event.target.checked;
  }

  onKey(event: any) { // without type info
    this.Ivalues.name = event.target.value;
  }



}
