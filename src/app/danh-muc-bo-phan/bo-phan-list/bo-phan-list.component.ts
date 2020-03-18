import { Component, OnInit, ViewChild } from '@angular/core';
import { PartsService } from 'src/app/service/parts.service';
import { Observable } from 'rxjs';
import { Parts } from 'src/app/model/parts';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bo-phan-list',
  templateUrl: './bo-phan-list.component.html',
  styleUrls: ['./bo-phan-list.component.css']
})
export class BoPhanListComponent implements OnInit {

  parts: Observable<Parts[]>
  part: Parts = new Parts();
  idPart: number;

  form = new FormGroup({
    partsName: new FormControl('', Validators.required)
  })

  constructor(private partService: PartsService) {

  }

  ngOnInit() {

    this.partService.refresh.subscribe(
      () => {
        this.load();
      });
    this.load();

  }

  load() {
    this.parts = this.partService.getPartsList();
  }

  createParts() {
    this.part = this.form.value;

    this.partService.createParts(this.part).subscribe(
      data => console.log(data), error => console.log(error)
    )

    console.log(this.part);
  }

  deletePart(id: number) {
    
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
        this.partService.deleteParts(id).subscribe(
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

  update() {
    this.part = this.form.value;
    this.partService.updateParts(this.idPart, this.part).subscribe(
      data => console.log(data), error => console.log(error)
    )
  }

  loadPartByid(id: number) {
    this.partService.getPartsId(id).subscribe(
      data => {
        console.log(data), this.part = data;
        this.form.controls['partsName'].setValue(this.part.partsName);
      }, error => console.log(error)
    )
    this.idPart = id;
  }

  onSubmit() {
    this.createParts();
  }

}
