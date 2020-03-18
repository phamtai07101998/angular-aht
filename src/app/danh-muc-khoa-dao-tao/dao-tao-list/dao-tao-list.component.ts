import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Training } from 'src/app/model/training';
import { TrainingService } from 'src/app/service/training.service';
import { error } from 'protractor';

@Component({
  selector: 'app-dao-tao-list',
  templateUrl: './dao-tao-list.component.html',
  styleUrls: ['./dao-tao-list.component.css']
})
export class DaoTaoListComponent implements OnInit {
  trainings: Observable<Training>;
  training: Training = new Training();
  idTraining: number;

  constructor(private trainingService: TrainingService) { }

  ngOnInit() {

    this.trainingService.refresh.subscribe(
      () => {
        this.load();
      });

    this.load();
  }

  load(){
    this.trainings = this.trainingService.getTrainingList();
  }

  create(){
    this.trainingService.createTraining(this.training).subscribe(
      data => console.log(data), error => console.log(error)
    )
  }

  find(id: number){
    this.trainingService.getTrainingId(id).subscribe(
      data => {
        console.log(data), this.training = data
      }, error => console.log(error)
    )
      this.idTraining = id;
  }

  update(){
    this.trainingService.updateTraining(this.idTraining, this.training).subscribe(
      data => console.log(data), error => console.log(error)
    )
  }

  delete(id: number){
    this.trainingService.deleteTraining(id).subscribe(
      data => console.log(data), error => console.log(error)
    )
  }


}
