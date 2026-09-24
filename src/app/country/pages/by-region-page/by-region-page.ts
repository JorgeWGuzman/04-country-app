import { Component, inject, linkedSignal, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';

import { CountryList } from '../../components/country-list/country-list';
import { CountryService } from '../../services/country';
import { Country } from '../../interfaces/country.interface';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'by-region-page',
  // Quitamos SearchInput porque usaremos botones, mantenemos CountryList
  imports: [CountryList],
  templateUrl: './by-region-page.html',
})
export class ByRegionPage {

  countryService = inject(CountryService);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  // Leemos el parámetro de la URL por si el usuario entra con un enlace directo (ej. ?region=Americas)
  regionParam = this.activatedRoute.snapshot.queryParamMap.get('region') ?? '';

  // 1. Señal para guardar la región utilizando el valor inicial de la URL
  selectedRegion = linkedSignal(() => this.regionParam);
  // 1. Señal para guardar la región en lugar de un texto libre


  // 2. Arreglo estático con los 5 continentes (en inglés para la API)
  // 2. Arreglo de objetos con los 5 continentes y sus respectivos colores
  public regions = [
    { name: 'Africa',   color: 'btn-primary' },
    { name: 'Americas', color: 'btn-secondary' },
    { name: 'Asia',     color: 'btn-accent' },
    { name: 'Europe',   color: 'btn-info' },
    { name: 'Oceania',  color: 'btn-success' }
  ];

  // 3. Configuramos rxResource igual que en países, tipando la respuesta y la petición
  countryResource = rxResource<Country[], { region: string }>({

    defaultValue: [] as Country[],

    params: () => ({
      region: this.selectedRegion(),
    }),

    stream: ({ params }) => {
      // Si la página recién carga y la señal está vacía, devolvemos un arreglo vacío controlado
      if (!params.region) {
        return of<Country[]>([]);
      }

      // Consumimos el nuevo método del servicio que armamos en el paso anterior
      return this.countryService.searchByRegion(params.region);
    }

  });
// Método nuevo para actualizar la señal y la URL al mismo tiempo
  onRegionSelect(region: string) {
    this.selectedRegion.set(region);

    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { region: region },
      queryParamsHandling: 'merge'
    });
  }
}
