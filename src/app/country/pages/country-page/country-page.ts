import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

import { CountryService } from '../../services/country';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-country-page',
  imports: [RouterLink], // Imprescindible para que el botón "Regresar" funcione
  templateUrl: './country-page.html',
})
export class CountryPage {
  private activatedRoute = inject(ActivatedRoute);
  private countryService = inject(CountryService);

  // Convertimos los parámetros de la URL en una señal reactiva segura
  private routeParams = toSignal(
    this.activatedRoute.params.pipe(
      map(params => params['code'] ?? '')
    ),
    { initialValue: '' }
  );

  // Recurso reactivo con tipado estricto que acepta null si no se encuentra el país
  countryResource = rxResource<Country | null, { code: string }>({
    defaultValue: null,
    params: () => ({
      code: this.routeParams(),
    }),
    stream: ({ params }) => {
      return this.countryService.searchCountryByAlphaCode(params.code);
    }
  });
}
