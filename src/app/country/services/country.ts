import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { catchError, map, Observable, throwError } from 'rxjs';

import { RESTCountries } from '../interfaces/rest-countries-interfase-2';
import type { Country } from '../interfaces/country.interface';
import { CountryMapper } from '../mappers/country.mapper';

const API_URL = 'https://api.restcountries.com/countries/v5';
const API_KEY = 'rc_live_d7111af9e621403e929a1f218ee3c086';

@Injectable({
  providedIn: 'root',
})
export class CountryService {

  private http = inject(HttpClient);

  searchByCapital(query: string): Observable<Country[]> {
  query = query.toLowerCase();
  const headers = new HttpHeaders({ Authorization: `Bearer ${API_KEY}` });

  return this.http
    .get<RESTCountries>(`${API_URL}/capitals?q=${query}`, { headers })
    .pipe(
      map((resp) => {
        // 1. Validación para v5: Si la API devuelve un código 200 pero el arreglo está vacío, forzamos un error
        if (!resp.data.objects || resp.data.objects.length === 0) {
          throw new Error('Sin coincidencias');
        }
        return CountryMapper.mapRestCountryArrayToCountryArray(resp.data.objects);
      }),
      catchError((error) => {
        console.log('Error fetching', error);

        // 2. Lanzamos un texto directo (String) e inyectamos la variable query
        return throwError(
          () => new Error(`Error: No se pudo obtener países con ese query ${query}`)
        );
      })
    );
   }

// --- MÉTODO 2: BÚSQUEDA POR PAÍS ---
  searchByCountry(query: string): Observable<Country[]> {
    query = query.toLowerCase();
    const headers = new HttpHeaders({ Authorization: `Bearer ${API_KEY}` });

    // Cambiamos /name/${query} por el parámetro de consulta ?q=${query}
    return this.http
      .get<RESTCountries>(`${API_URL}?q=${query}`, { headers })
      .pipe(
        map((resp) => {
          if (!resp.data.objects || resp.data.objects.length === 0) {
            throw new Error('Sin coincidencias');
          }
          return CountryMapper.mapRestCountryArrayToCountryArray(resp.data.objects);
        }),
        catchError((error) => {
          console.log('Error fetching', error);
          return throwError(
            () => new Error(`Error: No se pudo obtener países con ese query ${query}`)
          );
        })
      );
  }

}
