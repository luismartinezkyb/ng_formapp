import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

const product = {
  name:'RTX',
  price:122,
  inStorage:12
}

@Component({
  selector: 'app-basic-page',
  templateUrl: './basic-page.component.html',
})
export class BasicPageComponent implements OnInit{
  
  

  constructor(private fb: FormBuilder){}
  ngOnInit(): void {
    this.myForm.reset(product)
  }

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

  public myForm: FormGroup = this.fb.group({
    name:['', [Validators.required, Validators.minLength(3)]],
    price: [0,[Validators.required, Validators.min(0)]],
    inStorage: [0,[Validators.required, Validators.min(1)]],
  })

  onSave():void{

    if(!this.myForm.valid){
      this.myForm.markAllAsTouched();
      return;
    }
    console.log(this.myForm.value)

    this.myForm.reset({
      price:0,
      inStorage:0
    })
  }
}
