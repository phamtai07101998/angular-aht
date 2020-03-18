import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ContractEmp } from 'src/app/model/contract-emp';
import { Router } from '@angular/router';
import { ContractEmpService } from '../../service/contract-emp.service';
import { UserService } from 'src/app/service/user.service';
import { ContractService } from 'src/app/service/contract.service';
import { error } from 'protractor';
import { Contract } from 'src/app/model/contract';
import { Employee } from 'src/app/model/employee';
import { EmployeeService } from 'src/app/service/employee.service';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hop-dong-list',
  templateUrl: './hop-dong-list.component.html',
  styleUrls: ['./hop-dong-list.component.css']
})
export class HopDongListComponent implements OnInit {

  contractEmps: Observable<ContractEmp[]>;
  contract: Contract = new Contract();
  employees: Observable<Employee[]>;
  contractEmp: ContractEmp = new ContractEmp();
  idContract: number;
  idContractEmp: number;
  employee: Employee;
  empIdSelected: number;
  contractType: number;
  today: Date;


  constructor(private contractEmpService: ContractEmpService, private router: Router,
    private empService: EmployeeService, private contractService: ContractService,
    private formBuilder: FormBuilder) { }

  form = this.formBuilder.group({
    contractEmpId: [''],
    contractEmpStartDate: ['', Validators.required],
    contractEmpEndDate: ['', Validators.required],
    contractEmpStatus: ['',],
    employee: this.formBuilder.group({
      empId: ['', Validators.required]
    }),
    contract: this.formBuilder.group({
      contractCode: ['', [Validators.required,Validators.maxLength(9)]],
      contractType: ['', Validators.required]
    })
  });

  ngOnInit() {
    this.contractEmpService.refresh.subscribe(
      () => {
        this.load();
      });

    this.load();
    this.loadEmp();
    this.updateStatus();
  }

  load() {
    this.contractEmps = this.contractEmpService.getContractEmp();
  }

  loadEmp() {
    this.employees = this.empService.getEmployeeList();
  }

  async createContract() {
    this.contract = new Contract();
    this.contract.setContractCode = this.form.get(['contract','contractCode']).value;
    this.contract.setContractType = this.form.get(['contract','contractType']).value;
    let id = new Promise((resolve) => {
      this.contractService.createContract(this.contract).subscribe(
        Contract => {
          resolve(Contract.contractId);
        }
      )
    })

    this.idContract = Number(await id);
    console.log(this.idContract);

    this.contract = new Contract();
    this.contract.setContractId = this.idContract;
    

    this.employee = new Employee();
    this.employee.setEmpId = this.form.get(['employee','empId']).value;

    this.contractEmp = new ContractEmp();
    this.contractEmp.setContractEmpStartDate = this.form.get(['contractEmpStartDate']).value;
    this.contractEmp.setContractEmpEndDate = this.form.get(['contractEmpEndDate']).value;
    this.contractEmp.setEmployee = this.employee;
    this.contractEmp.setContract = this.contract;

    this.contractEmpService.createContractEmp(this.contractEmp).subscribe(
      data => console.log(data), error => console.log(error)
    )

  }

  onSubmit() {
    this.createContract();

  }

  deleteContractEmp(id: number) {
    

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
        this.contractEmpService.deleteContractEmp(id).subscribe(
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

  findContractById(id: number) {
    this.contractEmpService.getContractEmpId(id).subscribe(
      data => {
        console.log(data); this.contractEmp = data;
        this.form.get(['contractEmpStartDate']).setValue(this.contractEmp.contractEmpStartDate);
        this.form.get(['contractEmpEndDate']).setValue(this.contractEmp.contractEmpEndDate);
        this.form.get(['employee','empId']).setValue(this.contractEmp.employee.empId);
        this.form.get(['contract','contractCode']).setValue(this.contractEmp.contract.contractCode);
        this.form.get(['contract','contractType']).setValue(this.contractEmp.contract.contractType);
        this.idContract = this.contractEmp.contract.contractId;
        this.empIdSelected = this.contractEmp.employee.empId;
        this.contract = this.contractEmp.contract;
      }, error => console.log(error))

    this.idContractEmp = id;
  }

  updateContractEmp() {
    this.contractService.updateContract(this.idContract, this.contractEmp.contract).subscribe(
      data => console.log(data), error => console.log(error)
    );

    this.employee = new Employee();
    this.employee.setEmpId = this.empIdSelected;

    this.contract = new Contract();
    this.contract.setContractId = this.idContract;

    this.contractEmp.setContract = this.contract;
    this.contractEmp.setEmployee = this.employee;

    this.contractEmpService.updateContractEmp(this.idContractEmp, this.contractEmp).subscribe(
      data => {
        console.log(data)
      }, error => console.log(error)
    );
  }

  getEmpContract() {
    this.contractEmps = this.empService.getEmpContract();
  }

  getEmpContractExpiers() {
    this.contractEmps = this.empService.getEmpContractExpiers()
  }

  updateStatus(){

    this.today = new Date();
    var date = this.today.getFullYear()+'-'+(this.today.getMonth()+1)+'-'+this.today.getDate();
    console.log(date);

    this.contractEmpService.updateStatus(Date.parse(date)).subscribe(
      data => console.log(data), error => console.log(error)
    )

    
  }

}
