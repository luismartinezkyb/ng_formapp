import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorService } from 'src/app/shared/services/validators.service';
//import { cantBeStrider, emailPattern, firstNameAndLastnamePattern } from 'src/app/shared/validators/form.validators';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent {
  
  constructor(
    private fb: FormBuilder,
    private validatorService: ValidatorService
  ){}
  public myForm: FormGroup = this.fb.group({
    name:['', [Validators.required, Validators.pattern(this.validatorService.firstNameAndLastnamePattern)]],
    email:['', [Validators.required, Validators.pattern(this.validatorService.emailPattern)]],
    username:['', [Validators.required,this.validatorService.cantBeStrider]],
    password:['', [Validators.required, Validators.minLength(6)]],
    password2:['', [Validators.required]],
  })

  isValidField(field:string){
    //TODO: validation from service
    return this.validatorService.isValidField(this.myForm, field)
  }

  onSubmit(){
    if(this.myForm.invalid){
      this.myForm.markAllAsTouched();
      return;
    }
    console.log(this.myForm.value);
  }
}
