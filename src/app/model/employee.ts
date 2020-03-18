import { Department } from './department';

export class Employee{
    empId: number;
    empAddress: string;
    empDob: Date;
    empName: string;
    empNumberInsurance: string;
    empPhone: string;
    empSex: number;
    empType: number;
    department: Department;

    set setEmpId(empId: number){
        this.empId = empId;
    }

    set setDepartment(department: any){
        this.department = department;
    }

    set setEmpAddress(empAddress: string){
        this.empAddress = empAddress;
    }

    set setEmpDob(empDob: Date){
        this.empDob = empDob;
    }

    set setEmpName(empName: string){
        this.empName = empName;
    }

    set setEmpNumberInsurance(empNumberInsurance: string){
        this.empNumberInsurance = empNumberInsurance;
    }

    set setEmpPhone(empPhone: string){
        this.empPhone = empPhone;
    }

    set setEmpSex(empSex: number){
        this.empSex = empSex;
    }

}