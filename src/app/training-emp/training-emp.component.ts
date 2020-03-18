import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TrainingEmp } from '../model/trainingEmp';
import { TrainingEmpService } from '../service/training-emp.service';
import { Training } from '../model/training';
import { TrainingService } from '../service/training.service';
import {Router} from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import {DateEnd, dateLessThan} from '../CustomValidate';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-training-emp',
  templateUrl: './training-emp.component.html',
  styleUrls: ['./training-emp.component.css']
})
export class TrainingEmpComponent implements OnInit {
  trainings: Observable<Training>;
  training: Training = new Training();
  idTraining: number;
  minDate: Date;
  maxDate: Date;
  submit = true;
  today: Date;
  row: number;

  constructor(private trainingService: TrainingService, private router: Router, 
    private formBuilder: FormBuilder) {
     }

  form = this.formBuilder.group({
    trainingId :[''],
    trainingCode: ['', Validators.required],
    trainingName: ['', Validators.required],
    trainingStartDate: ['', [Validators.required]],
    trainingStartEnd: ['', [Validators.required]],
    trainingStatus: ['']
  },{validator: dateLessThan('trainingStartDate', 'trainingStartEnd')});

  bsConfig = {
    dateInputFormat: 'YYYY-MM-DD'
  };

  ngOnInit() {

    this.trainingService.refresh.subscribe(
      () => {
        this.load();
      });

    this.load();
    this.updateStatus();
  }

  show(){
    
    this.minDate = new Date(this.form.controls['trainingStartDate'].value);
    if(this.minDate.getFullYear() < 2021){
      return true;
    }
    
  }

  load(){
    this.trainings = this.trainingService.getTrainingList();
  }


  create(){

    this.training = new Training();
    this.training = this.form.value;

    this.trainingService.createTraining(this.training).subscribe(
      data => console.log(data), error => console.log(error)
    )
  }

  find(id: number){
    this.trainingService.getTrainingId(id).subscribe(
      data => {
        console.log(data), this.training = data;
        this.form.setValue(this.training);
      }, error => console.log(error)
    )
      this.idTraining = id;
  }

  update(){

    this.training = new Training();
    this.training = this.form.value;

    this.trainingService.updateTraining(this.idTraining, this.training).subscribe(
      data => console.log(data), error => console.log(error)
    )
    // let date = this.form.get(['trainingStartDate']).value;
    // let d = new Date(date);
    // console.log(date.valueOf());
  }

  delete(id: number){
    
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

  trainingEmpDetail(id: number){
      this.router.navigate(['daotao/detail', id]);
  }

  reset(){
    this.form.reset();
  }

  updateStatus(){
    this.today = new Date();
    var date = this.today.getFullYear()+'-'+(this.today.getMonth()+1)+'-'+this.today.getDate();
    console.log(date);
    this.trainingService.updateStatus(Date.parse(date)).subscribe(
      data => console.log(data), error => console.log(error)
    )
  }

  trainingExpier(){
    this.trainings = this.trainingService.trainingExpiers();
  }

  count(){
    for (this.row = 1; this.row <3; this.row ++)
    return this.row;
  }

}
