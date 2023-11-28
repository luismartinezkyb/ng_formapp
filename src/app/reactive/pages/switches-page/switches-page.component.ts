import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-switches-page',
  templateUrl: './switches-page.component.html',
})
export class SwitchesPageComponent implements OnInit {
  constructor(
    private fb: FormBuilder
  ){}
  ngOnInit(): void {
    this.myForm.reset(this.person);
  }

  public myForm: FormGroup = this.fb.group({
    gender:['M', Validators.required],
    wantNotifications:[true, Validators.required],
    termsAndConditions:[false, Validators.requiredTrue],
  })

  public person = {
    gender: 'F',
    wantNotifications:false,
  }

  /**
   * 
   * @returns ERRORS
   */
  isValidField(field:string):boolean | null{
    return this.myForm.controls[field].errors && this.myForm.controls[field].touched
  }
  
  getFieldError(field:string):string | null{
    if(!this.myForm.controls[field]) return null;

    const errores = this.myForm.controls[field].errors;

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

  onSave(){
    if(this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    const {gender, wantNotifications} = this.myForm.value
    this.person = {
      gender,
      wantNotifications
    };
  }
}
