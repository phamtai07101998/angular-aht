import { Parts } from './parts';

export class Department{
    departmentId: number;
    departmentName: string;
    parts: Parts;

    set setParts(parts: any){
        this.parts = parts;
    }

    set setDepartmentName(name: string){
        this.departmentName = name;
    }

    set setDepartmentID(departmentId: number){
        this.departmentId = departmentId;
    }
}