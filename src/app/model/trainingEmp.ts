import { Employee } from './employee';
import { Training } from './training';

export class TrainingEmp{
    trainingEmpId: number;
    trainingEmpResult: string;
    trainingEmpStatus: number;
    employee: Employee;
    training: Training;

    set setTraining(training: any){
        this.training = training;
    }

    set setEmployee(employee: any){
        this.employee = employee;
    }

    set setTrainingEmpId(trainingEmpId: number){
        this.trainingEmpId = trainingEmpId;
    }

    set setTrainingEmpResult(trainingEmpResult: string){
        this.trainingEmpResult = trainingEmpResult;
    }
}