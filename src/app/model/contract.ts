export class Contract{
    contractId: number;
    contractCode: string;
    contractType: number;

    set setContractId(contractId:number){
        this.contractId = contractId;
    }

    set setContractType(contractType: number){
        this.contractType = contractType;
    }

    set setContractCode(contractCode: string){
        this.contractCode = contractCode;
    }
}