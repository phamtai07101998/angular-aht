import { Component, OnInit } from '@angular/core';
import { DepartmentService } from 'src/app/service/department.service';
import { Observable } from 'rxjs';
import { Department } from 'src/app/model/department';
import { Parts } from 'src/app/model/parts';
import { PartsService } from 'src/app/service/parts.service';
import { error } from 'protractor';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-phong-ban-list',
  templateUrl: './phong-ban-list.component.html',
  styleUrls: ['./phong-ban-list.component.css']
})
export class PhongBanListComponent implements OnInit {

  departments: Observable<Department[]>;
  department: Department = new Department();
  idDepartment: number;
  parts: Observable<Parts[]>;
  idPartSelected: number;
  idPartSelected1: number;
  part: Parts;
  departmentUpdate: Department;

  constructor(private departmentService: DepartmentService, private partService: PartsService, 
    private formBuilder: FormBuilder) { }

    form = this.formBuilder.group({
      departmentId :[''],
      departmentName: ['', Validators.required],
      parts : this.formBuilder.group({
        partsId: [''],
        partsName: ['']
      })
    });

  ngOnInit() {

    this.departmentService.refresh.subscribe(
      () => {
        this.load();
      });

    this.load();
    this.loadPart();
  }

  load(){
    this.departments = this.departmentService.getDepartmentList();
  }

  loadPart(){
    this.parts = this.partService.getPartsList();
  }

  create(){
    this.department = new Department();
    this.department = this.form.value;
    console.log(this.department);

    this.departmentService.createDepartment(this.department).subscribe(
      data => console.log(data), error => console.log(error)
    )
  }

  delete(id: number){

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
        this.departmentService.deleteDepartment(id).subscribe(
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

  findDepartmentById(id: number){
    this.departmentService.getDepartmentId(id).subscribe(
      data => {
        console.log(data); this.department = data;
        this.form.setValue(this.department);
      }, error => console.log(error)
    )

    this.idDepartment = id;
  }

  update(){
    this.part = new Parts();
    this.part.setPartsId = this.form.get(['parts','partsId']).value;

    this.department = new Department();
    this.department.setDepartmentName = this.form.get(['departmentName']).value;
    this.department.setParts = this.part;

    this.departmentService.updateDepartment(this.idDepartment, this.department).subscribe(
      data => console.log(data), error => console.log(error)
    )
    
  }


}
