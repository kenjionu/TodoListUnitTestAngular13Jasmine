import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoListComponent } from './todo-list.component';
import { Todolist } from '../core/todo-list/todolist';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { BrowserModule, By } from '@angular/platform-browser';
import { iTask } from '../core/interface/todo-list';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  let Ivalues: iTask = {
    id: '',
    name: '',
    completed: false,
  };
  let inputDivEdit: boolean = false;
  let tasks: iTask[] = [
  ];
  let el: DebugElement;
  let formBuilder: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        BrowserModule,
        FormsModule
      ],
      providers: [
        FormBuilder
      ],
      declarations: [ TodoListComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents()
    .then(() =>  {
      fixture = TestBed.createComponent(TodoListComponent);
      component = fixture.componentInstance;
      el = fixture.debugElement;
      formBuilder = TestBed.inject(FormBuilder);
 
        fixture.detectChanges();
    })
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    component.taskForm = formBuilder.group({
      name: new FormControl(null, 
        [Validators.required, Validators.minLength(3) 
        ])
        });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should ngOnInit', () => {
    spyOn(component, "getTask").and.returnValue(tasks)
    component.ngOnInit();
    expect(component.getTask).toHaveBeenCalled()
  })

  it('should ngOnInit', () => {
    let taskmock = component.tasks = [
      new Todolist(`list-${Math.random()}`,'ds', false)
    ];


    component.ngOnInit();
    expect(component.tasks).toEqual(taskmock)
  })




  describe("testing Task with jasmine", function() {

    it('should addTask formgroup', () => {
      expect(component.taskForm instanceof FormGroup).toBe(true)
    })

    it('should button add chequed button task', () => {
      const button = el.query(By.css("#submitTaskadd"))
      expect(button).toBeTruthy("Could not button")  
    })
    
    it('should button add task', () => {
      Ivalues = {
        id: "list-43242342424",
        name: "terror",
        completed: true,
      }
      component.addTask(Ivalues)
      expect(Ivalues).toEqual({
        id: "list-43242342424",      
        name: "terror",
        completed: true,
      })
    })
  
    it('should addtask disable button false', () => {
      component.taskForm.disabled
      expect(component.taskForm.disabled).toBe(false)
    })

    it('should deleteTask', () => {
      let Ivaluess: iTask = {
        id: "list-43242342424",
        name: "terror",
        completed: false,
      }

      component.deleteTask(Ivaluess)

      expect(component.tasks).toEqual([])
    })  
  });
  
  
  it('should onKey', () => {
    const event = { target: { value:'rwrewrrew'}};
    component.Ivalues.name = event.target.value
    component.onKey(event)

    expect(component.Ivalues.name).toEqual(event.target.value)
  })



  it('addStatus', () => {
    const event = { target: { checked:true}};
    // const tasksx = spyOn(component, "addTask").and.returnValue(tasks)
    const ttask = new Todolist(`list-${Math.random()}`,'dasd', false)

    component.addStatus(ttask , event)
    expect(tasksx).toBe(true)
  
  })

  
  

});
