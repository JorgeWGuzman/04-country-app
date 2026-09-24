import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { catchError, delay, map, Observable, of, tap, throwError } from 'rxjs';

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
  private queryCacheCapital = new Map<string, Country[]>();
  private queryCacheCountry = new Map<string, Country[]>();
  private queryCacheRegion = new Map<string, Country[]>();

  searchByCapital(query: string): Observable<Country[]> {
  query = query.toLowerCase();
  const headers = new HttpHeaders({ Authorization: `Bearer ${API_KEY}` });

  if (this.queryCacheCapital.has(query)) {
    return of(this.queryCacheCapital.get(query) ?? []);
  }

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
      tap(countries => this.queryCacheCapital.set(query, countries)),

      catchError((error) => {
        console.log('Error fetching', error);

        // 2. Lanzamos un texto directo (String) e inyectamos la variable query
        return of<Country[]>([]);
      })
    );
   }

// --- MÉTODO 2: BÚSQUEDA POR PAÍS ---
  searchByCountry(query: string): Observable<Country[]> {
    query = query.toLowerCase();
    const headers = new HttpHeaders({ Authorization: `Bearer ${API_KEY}` });

    if (this.queryCacheCountry.has(query)) {
    return of(this.queryCacheCountry.get(query) ?? []);
  }

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
        tap(countries => this.queryCacheCountry.set(query, countries)),

        catchError((error) => {
          console.log('Error fetching', error);
          return of<Country[]>([]);
        })
      );
  }

// 1. Modificamos la firma para aceptar que puede devolver un país o nada (null)
searchCountryByAlphaCode(code: string): Observable<Country | null> {

  code = code.toLowerCase();
  const headers = new HttpHeaders({ Authorization: `Bearer ${API_KEY}` });

  return this.http
    .get<RESTCountries>(`${API_URL}/code?q=${code}`, { headers })
    .pipe(
      map((resp) => {
        if (!resp.data.objects || resp.data.objects.length === 0) {
          throw new Error('Sin coincidencias');
        }
        return CountryMapper.mapRestCountryArrayToCountryArray(resp.data.objects);
      }),

      map((countries) => countries.at(0)!),

      catchError((error) => {
        console.log('Error fetching por código controlado:', error);

        // 2. Devolvemos null de forma segura en lugar de un arreglo vacío
        return of(null);
      })
    );
}
// --- MÉTODO 3: BÚSQUEDA POR REGIÓN ---
  searchByRegion(region: string): Observable<Country[]> {
    region = region.toLowerCase();
    const headers = new HttpHeaders({ Authorization: `Bearer ${API_KEY}` });

    // 1. Verificamos si la región ya está en el caché
    if (this.queryCacheRegion.has(region)) {
      return of(this.queryCacheRegion.get(region) ?? []);
    }

    // 2. Construimos la petición con el parámetro region
    return this.http
      .get<RESTCountries>(`${API_URL}?region=${region}`, { headers })
      .pipe(
        map((resp) => {
          // Reutilizamos tu validación para v5
          if (!resp.data.objects || resp.data.objects.length === 0) {
            throw new Error('Sin coincidencias');
          }
          return CountryMapper.mapRestCountryArrayToCountryArray(resp.data.objects);
        }),
        // 3. Guardamos en el nuevo caché de regiones
        tap(countries => this.queryCacheRegion.set(region, countries)),

        catchError((error) => {
          console.log('Error fetching por región', error);
          return of<Country[]>([]);
        })
      );
  }
}
