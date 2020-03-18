import { Component, OnInit } from '@angular/core';
import { ContractEmpResult } from 'src/app/model/ContractEmpResult';
import { Observable } from 'rxjs';
import { EmployeeService } from 'src/app/service/employee.service';

@Component({
  selector: 'app-nhan-vien-thu-viec',
  templateUrl: './nhan-vien-thu-viec.component.html',
  styleUrls: ['./nhan-vien-thu-viec.component.css']
})
export class NhanVienThuViecComponent implements OnInit {
  contractEmps: Observable<ContractEmpResult[]>;
  selected: number;
  constructor(private empService: EmployeeService) { }

  ngOnInit() {
    
  }

  load(){
    this.contractEmps = this.empService.getEmployeeByTypeContract(this.selected);
    
  }

}
