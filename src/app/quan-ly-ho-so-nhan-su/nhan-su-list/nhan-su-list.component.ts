import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/model/employee';
import { Observable, from } from 'rxjs';
import { EmployeeService } from 'src/app/service/employee.service';
import { Department } from 'src/app/model/department';
import { DepartmentService } from 'src/app/service/department.service';
import { error } from 'protractor';
import { FormBuilder, Validators } from '@angular/forms';
import {phoneValidate} from '../../CustomValidate';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nhan-su-list',
  templateUrl: './nhan-su-list.component.html',
  styleUrls: ['./nhan-su-list.component.css']
})
export class NhanSuListComponent implements OnInit {
  employees: Observable<Employee[]>;
  employee: Employee = new Employee();
  empUpdate: Employee;
  departments: Observable<Department[]>;
  department: Department;
  idDepartSelected: number;
  idEmp: number;

  constructor(private empService: EmployeeService, private departService: DepartmentService,
    private formBuilder: FormBuilder) { }
  form = this.formBuilder.group({
    empId :[''],
    empAddress: ['', Validators.required],
    empDob: ['', Validators.required],
    empName: ['', Validators.required],
    empNumberInsurance: ['', Validators.required],
    empPhone: ['', [Validators.required]],
    empSex: ['', Validators.required],
    empType: ['', Validators.required],
    department: this.formBuilder.group({
      departmentId :['', Validators.required],
      departmentName: [''],
      parts : this.formBuilder.group({
        partsId: [''],
        partsName: ['']
      })
    })
  });

  ngOnInit() {

    this.empService.refresh.subscribe(
      () => {
        this.load();
      });

    this.load();
    this.loadDepartment();
  }

  load(){
    this.employees = this.empService.getEmployeeList();
  }

  loadDepartment(){
    this.departments = this.departService.getDepartmentList();
  }
  
  findEmpById(id: number){
    this.empService.getEmployeeId(id).subscribe(
      data => {
        console.log(data), this.employee = data;
        this.idDepartSelected = this.employee.department.departmentId;
        this.form.setValue(this.employee);
      }, error => console.log(error)
    )
    
    this.idEmp = id;
  }

  deleteEmpById(id: number){
    Swal.fire({
      title: 'Are you sure?',
      text: "Bạn có chắc chắn muốn xóa!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.empService.deleteEmployee(id).subscribe(
          data => console.log(data), error => console.log(error)
        )
        Swal.fire(
          'Deleted!',
          'Xóa thành công.',
          'success'
        )
      }
    })
    
  }

  createEmp(){

    this.employee = new Employee();
    this.employee = this.form.value;
    

    this.empService.createEmployee(this.employee).subscribe(
      data => console.log(data), error => console.log(error)
    )
  }

  updateEmp(){
    this.employee = new Employee();
    this.employee = this.form.value;

    this.empService.updateEmployee(this.idEmp, this.employee).subscribe(
      data => {
        console.log(data)
      }, error => console.log(error)
    )

    console.log(this.form.value);
  }

}
