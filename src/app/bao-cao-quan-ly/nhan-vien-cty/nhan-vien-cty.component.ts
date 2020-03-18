import { Component, OnInit } from '@angular/core';
import { Observable  } from 'rxjs';
import { Employee } from 'src/app/model/employee';
import { EmployeeService } from 'src/app/service/employee.service';
import { Department } from 'src/app/model/department';
import { Parts } from 'src/app/model/parts';
import { DepartmentService } from 'src/app/service/department.service';
import { PartsService } from 'src/app/service/parts.service';

@Component({
  selector: 'app-nhan-vien-cty',
  templateUrl: './nhan-vien-cty.component.html',
  styleUrls: ['./nhan-vien-cty.component.css']
})
export class NhanVienCtyComponent implements OnInit {
  employees: Observable<Employee[]>;
  departments: Observable<Department[]>;
  parts: Observable<Parts[]>;
  departmentIdSelected: number;
  partIdSelected: number;
  list: any[];
  constructor(private empService: EmployeeService, private departService: DepartmentService,
    private partService: PartsService) { }

  ngOnInit() {
    this.departmentIdSelected = 0;
    this.partIdSelected = 0;
    this.load();
    this.loadDepartment();
    this.loadPart();
  }

  load(){
    this.employees = this.empService.getEmployeeList();
    
  }

  async filterByDepartment(){
    if(this.partIdSelected !=0 && this.departmentIdSelected !=0){
      this.employees = this.empService.filterEmpByDepartment(this.partIdSelected, this.departmentIdSelected);
    }else{
      console.log("chon da nao");
    }

    
    
  }

  show(){
    console.log(this.employees);
  }

  loadDepartment(){
    this.departments = this.departService.getDepartmentList();
  }

  loadPart(){
    this.parts = this.partService.getPartsList();
  }

}
