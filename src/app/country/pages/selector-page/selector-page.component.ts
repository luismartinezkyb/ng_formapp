import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountriesService } from '../../services/countries.service';
import { Region, SmallCountry } from '../../interfaces/country.interface';
import { delay, filter, switchMap, tap } from 'rxjs';

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
    border:['', Validators.required],
  })
  public countriesByRegion: SmallCountry[] = []
  public borders: SmallCountry[] = [];

  ngOnInit(): void {
    this.onRegionChanged()
    this.onCountryChanged ()
    
  }
//RECIBIR VALOR DE OBSERVABLE Y SUSCRIBIRME EN OTRO CON EL SWITCH MAP
  onRegionChanged():void{
    this.myForm.get('region')!.valueChanges
    .pipe(
      tap(()=>this.myForm.get('country')!.setValue('')),
      switchMap(region=>this.countriesService.getCountriesByRegion(region)),
      
    ).subscribe(countries=>{
      this.countriesByRegion = countries;
    })
    
  }
  get regions(): Region[]{
    return this.countriesService.regions;
  }

  onCountryChanged():void{
    this.myForm.get('country')!.valueChanges
    .pipe(
      tap(()=>this.myForm.get('border')!.setValue('')),
      filter((value:string)=>value.length>0),
      switchMap(alphaCode=>this.countriesService.getCountryByAlphaCode(alphaCode)),
      switchMap(country=>this.countriesService.getCountryBordersByCodes(country.borders))
    ).subscribe(countries=>{
      console.log(countries)
      this.borders = countries;
    })
  }

}
