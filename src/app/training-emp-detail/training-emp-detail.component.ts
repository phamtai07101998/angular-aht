import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TrainingService } from '../service/training.service';
import { Observable } from 'rxjs';
import { TrainingEmp } from '../model/trainingEmp';
import { TrainingEmpService } from '../service/training-emp.service';
import { Employee } from '../model/employee';
import { EmployeeService } from '../service/employee.service';
import { Training } from '../model/training';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-training-emp-detail',
  templateUrl: './training-emp-detail.component.html',
  styleUrls: ['./training-emp-detail.component.css']
})
export class TrainingEmpDetailComponent implements OnInit {
  id: number;
  trainingEmps: Observable<TrainingEmp[]>;
  trainingEmp: TrainingEmp;
  employees: Observable<Employee[]>;
  employee: Employee;
  training: Training = new Training();
  empIdSelected: number;
  test = false;
  idTest: number;
  constructor(private router: Router, private activatedRouter: ActivatedRoute,
    private trainingEmpService: TrainingEmpService, private empService: EmployeeService,
    private trainingService: TrainingService, private formBuilder: FormBuilder) { }

  form = this.formBuilder.group({
    empId: ['']
  });

  emp = this.formBuilder.group({
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

    this.trainingEmpService.refresh.subscribe(
      () => {
        this.load();
      });
    this.load();
    this.loadEmp();
    this.findName();
  }

  load() {
    this.id = this.activatedRouter.snapshot.params['id'];
    this.trainingEmps = this.trainingEmpService.getEmpByTrainingId(this.id);
  }

  findName() {
    this.trainingService.getTrainingId(this.id).subscribe(
      data => {
        console.log(data), this.training = data;
      }, error => console.log(error)
    )
  }

  loadEmp() {
    this.employees = this.empService.getEmployeeList();
  }

  addEmpTraining() {
    this.training = new Training();
    this.training.setTrainingId = this.id;

    this.employee = new Employee();
    this.employee.setEmpId = this.form.controls['empId'].value;

    this.trainingEmp = new TrainingEmp();
    this.trainingEmp.setEmployee = this.employee;
    this.trainingEmp.setTraining = this.training;

    this.trainingEmpService.createTrainingEmp(this.trainingEmp).subscribe(
      data => {
        console.log(data)
      }, error => console.log(error)
    )
    if(this.test){
      console.log(this.test)
    }else{
      console.log(this.test)
    }

  }

  deleteTrainingEmp(id: number) {
    this.trainingEmpService.deleteTrainingEmp(id).subscribe(
      data => console.log(data), error => console.log(error)
    )
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
        this.trainingService.deleteTraining(id).subscribe(
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

  async trungTen() {
    let id = new Promise((resolve) => {
      this.trainingEmpService.trungTen(this.id, this.form.controls['empId'].value).subscribe(
        TrainingEmp => {
          resolve(TrainingEmp);
        }
      )
    })

    this.idTest = Number(await id);
    if(this.idTest ==0){
      this.addEmpTraining();
      Swal.fire({
        position: 'bottom-end',
        icon: 'success',
        title: 'Bạn đã thêm thành công',
        showConfirmButton: false,
        timer: 1500
      })
      // console.log("Ten chua ton tai")
    }else{
      Swal.fire({
        title: 'Lỗi',
        text: 'Nhân viên đã tồn tại',
        icon: 'error',
        confirmButtonText: 'Đóng'
      })
    }

  }

}
