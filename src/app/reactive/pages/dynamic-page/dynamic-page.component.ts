import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dynamic-page',
  templateUrl: './dynamic-page.component.html',
  styles: [
  ]
})
export class DynamicPageComponent {
  constructor(private fb:FormBuilder){}

  
  public myForm: FormGroup = this.fb.group({
    name:['', [Validators.required, Validators.minLength(3)]],
    favoriteGames:this.fb.array([
      ['Metal Gear', Validators.required],
      ['Death Stranding Gear', Validators.required],
    ])
  })
  public newFavorite: FormControl = new FormControl('',[Validators.required]);

  get favoriteGames():FormArray{
    return this.myForm.get('favoriteGames') as FormArray;
  }

  isValidField(field:string):boolean | null{
    return this.myForm.controls[field].errors && this.myForm.controls[field].touched
  }
  isValidFieldInArray(formArray:FormArray, index:number){
    return formArray.controls[index].errors && formArray.controls[index].touched
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

  onAddFavorite():void{
    if(this.newFavorite.invalid) return;
    const value = this.newFavorite.value
    //this.favoriteGames.push(new FormControl(value))
    this.favoriteGames.push(
      this.fb.control(value,Validators.required)
    );
    this.newFavorite.reset()
  }
  

  onSubmit():void{
    if(!this.myForm.valid){
      this.myForm.markAllAsTouched();
      return;
    }
    console.log(this.myForm.value)
    this.myForm.reset();
    (this.myForm.controls['favoriteGames'] as FormArray) = this.fb.array([]);
  }

  onDeleteFavorite(index:number):void{
    this.favoriteGames.removeAt(index);
  }
}
