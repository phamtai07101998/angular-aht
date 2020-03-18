import {ValidatorFn, AbstractControl, FormGroup} from '@angular/forms';
import { Key } from 'protractor';

export const phoneValidate = (): ValidatorFn => {
    return (control: AbstractControl): { [key: string]: string} => {
        const result = /^\+?\d{1,3}?[- .]?\(?(?:\d{2,3})\)?[- .]?\d\d\d[- .]?\d\d\d\d$/.test(control.value);
        console.log(`phone validate = ${result}`);
        return result == true ? null :{'error': "Chua dung format"};
    }
}

export function MustMatch(dateStart: Date, dateEnd: Date) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[dateStart.valueOf()];
        const matchingControl = formGroup.controls[dateEnd.valueOf()];

        // return null if controls haven't initialised yet
        if (!control || !matchingControl) {
          return null;
        }

        // return null if another validator has already found an error on the matchingControl
        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            return null;
        }

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}

export function DateEnd(dateEnd:string){
    return (form: FormGroup) =>{
        var val = form.controls[dateEnd];
        var date = new Date(val.value);
        var ss = 2030;

        if(date.getFullYear() > ss){
            return null;
        }
        
    }
}

export function dateLessThan(from: string, to: string) {
    return (group: FormGroup): {[key: string]: any} => {
      let f = group.controls[from];
      let t = group.controls[to];
      if (f.value > t.value) {
        return {
          dates: "Date from should be less than Date to"
        };
      }
      return {};
    }
}

