import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountriesService } from '../../services/countries.service';
import { Region, SmallCountry } from '../../interfaces/country.interface';
import { delay, switchMap } from 'rxjs';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  
})
export class SelectorPageComponent implements OnInit{
  constructor(
    private fb: FormBuilder,
    private countriesService: CountriesService
  ){}
  public isLoading:boolean = false;
  public myForm: FormGroup = this.fb.group({
    region:['', Validators.required],
    country:['', Validators.required],
    borders:['', Validators.required],
  })
  public countriesByRegion: SmallCountry[] = []


  ngOnInit(): void {
    this.onRegionChanged()
    console.log('hola')
  }
//RECIBIR VALOR DE OBSERVABLE Y SUSCRIBIRME EN OTRO CON EL SWITCH MAP
  onRegionChanged():void{
    
    this.myForm.get('region')!.valueChanges
    .pipe(
      switchMap(region=>this.countriesService.getCountriesByRegion(region)),
      
    ).subscribe(countries=>{
      this.countriesByRegion = countries;
    })
    
  }
  get regions(): Region[]{
    return this.countriesService.regions;
  }



}
