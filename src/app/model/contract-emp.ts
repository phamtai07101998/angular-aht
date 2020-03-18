import { Employee } from './employee';
import { Contract } from './contract';

export class ContractEmp{
    contractEmpId: number;
    contractEmpStartDate: Date;
    contractEmpEndDate: Date;
    contractEmpStatus: number;
    employee: Employee;
    contract: Contract;

    set setEmployee(emp: any){
        this.employee = emp;
    }

    set setContract(contract: any){
        this.contract = contract;
    }

    set setContractEmpId(contractEmpId: number){
        this.contractEmpId = contractEmpId;
    }

    set setContractEmpStartDate(contractEmpStartDate: Date){
        this.contractEmpStartDate = contractEmpStartDate;
    }

    set setContractEmpEndDate(contractEmpEndDate: Date){
        this.contractEmpEndDate = contractEmpEndDate;
    }
}