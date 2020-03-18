export class Training{
    trainingId: number;
    trainingCode: string;
    trainingName: string;
    trainingStartDate: Date;
    trainingStartEnd: Date;
    trainingStatus: number;

    set setTrainingId(trainingId: number){
        this.trainingId = trainingId;
    }

    set setTrainingCode(trainingCode: string){
        this.trainingCode = trainingCode;
    }

    set setTrainingName(trainingName: string){
        this.trainingName = trainingName;
    }

    set setTrainingStartDate(trainingStartDate: Date){
        this.trainingStartDate = trainingStartDate;
    }

    set setTrainingStartEnd(trainingStartEnd: Date){
        this.trainingStartEnd = trainingStartEnd;
    }

}