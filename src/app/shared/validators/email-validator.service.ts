import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable, delay, of } from 'rxjs';

@Injectable({providedIn: 'root'})
export class EmailValidatorService implements AsyncValidator{
  constructor() { }
  validate(control: AbstractControl<any, any>):Observable<ValidationErrors | null> {
    const email = control.value;
    console.log({email})

    const httpCallObservable = new Observable<ValidationErrors | null>((subscriber)=>{
      if(email==='luis@gmail.com'){
        subscriber.next({emailTaken:true});
        
        subscriber.complete();//Se completa el observable para completarlo y no poder hacer nada más
        return;
      }

      subscriber.next(null)
      subscriber.complete(); ///
    }).pipe(
      delay(2000)
    );

    return httpCallObservable
  }

  
  //EJEMPLO DEL PIPE 2000 para que vean que es async
  //Podríamos checar si el email existe
  // validate(control: AbstractControl<any, any>):Observable<ValidationErrors | null> {
  //   const email = control.value;
  //   console.log({email})

  //   return of({
  //     emailTaken:true
  //   })
  // }
  // register OnValidatorChange?(fn: () => void): void {
  //   throw new Error('Method not implemented.');
  // }
  
}