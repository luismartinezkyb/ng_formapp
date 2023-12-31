import { Injectable } from '@angular/core';
import { Country, Region, SmallCountry } from '../interfaces/country.interface';
import { HttpClient } from '@angular/common/http';
import { Observable, combineLatest, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  private baseUrl: string = 'https://restcountries.com/v3.1';
  private _regions: Region[] =[Region.Africa,Region.Asia,Region.Oceania,Region.Americas,Region.Europe]

  constructor(
    private httpClient: HttpClient
  ) { }

  get regions():Region[]{
    return [...this._regions];
    // TENGO QUE HACER UN DEEP CLONE PARA PODER 
  }

  getCountriesByRegion(region:Region):Observable<SmallCountry[]>{

    if(!region) return of([])
    console.log({region})
    const url=`${this.baseUrl}/region/${region}?fields=cca3,name,borders`
    return this.httpClient.get<Country[]>(url).pipe(
      map(countries=> countries.map(country=>({
        name:country.name.common,
        cca3: country.cca3,
        borders: country.borders ?? []
      })))
      
    )
    
  }

  getCountryByAlphaCode(alphaCode: string): Observable<SmallCountry>{
    if(!alphaCode) return of()

    const url=`${this.baseUrl}/alpha/${alphaCode}?fields=cca3,name,borders`

    return this.httpClient.get<Country>(url)
    .pipe(
      map(country=>({
        name:country.name.common,
        cca3: country.cca3,
        borders: country.borders ?? []
      }))
    )
  }

  getCountryBordersByCodes(borders:string[]):Observable<SmallCountry[]>{
    if(!borders || borders.length ===0) return of([]);

    const countriesRequest: Observable<SmallCountry>[] = [];
    borders.forEach(code=>{
      const request = this.getCountryByAlphaCode(code);
      countriesRequest.push(request)
    })
    //combine latest
    return combineLatest(countriesRequest);
    
  }
}
