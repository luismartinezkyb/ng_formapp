import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({providedIn: 'root'})
export class ValidatorService {
  
  public firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  public cantBeStrider= (control:FormControl)=>{

    const value: string = control.value.trim().toLowerCase();
  
    if(value==='strider'){
      return {
        noStrider:true,
      }
    }
    return null
  }

  public isValidField(form: FormGroup, field:string):boolean | null{
    return form.controls[field].errors && form.controls[field].touched
  }

  public getFieldError(form: FormGroup, field:string):string | null{
    if(!form.controls[field]) return null;

    const errores = form.controls[field].errors;

    for (const key in errores) {
      switch(key){
        case 'required':
          return 'Field required'
          break;
        case 'minlength':
          return `Minimo ${errores['minlength'].requiredLength} characters`
          break;
        
      }
    }
    return null
  }
}