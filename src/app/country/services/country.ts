import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountries } from '../interfaces/rest-countries-interfase-2';

const API_URL = 'https://api.restcountries.com/countries/v5';
const API_KEY = 'rc_live_d7111af9e621403e929a1f218ee3c086';

@Injectable({
  providedIn: 'root',
})
export class Country {

  private http = inject(HttpClient);

  searchByCapital(query: string) {
    query = query.toLowerCase();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${API_KEY}`
    });

    return this.http.get<RESTCountries>(`${API_URL}/capitals?q=${query}`, { headers });

  }
}
