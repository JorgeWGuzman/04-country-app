// import { Component, inject, resource, signal } from '@angular/core';
// import { SearchInput } from "../../components/search-input/search-input";
// import { CountryList } from "../../components/country-list/country-list";
// import { CountryService } from '../../services/country';
// import { firstValueFrom, of } from 'rxjs';
// import { rxResource } from '@angular/core/rxjs-interop';

// @Component({
//   selector: 'app-by-country-page',
//   imports: [SearchInput, CountryList],
//   templateUrl: './by-country-page.html',
// })
// export class ByCountryPage {

//   countryService = inject(CountryService);
//   query = signal('');

//   countryResource = resource({
//     params: () => ({ query: this.query() }),

//     loader: async({ params }) => {
//        if (!params.query) return [];

//        return await firstValueFrom(
//          // Invocamos el nuevo método que busca por el endpoint /name/
//          this.countryService.searchByCountry(params.query)
//        );
//     },
//   });
// }
import { Component, inject, linkedSignal, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';

import { SearchInput } from '../../components/search-input/search-input';
import { CountryList } from '../../components/country-list/country-list';
import { CountryService } from '../../services/country';
import { Country } from '../../interfaces/country.interface';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-by-country-page',
  imports: [SearchInput, CountryList],
  templateUrl: './by-country-page.html',
})
export class ByCountryPage {

  countryService = inject(CountryService);

    activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') ?? '';

  query = linkedSignal(() => this.queryParam);

  countryResource = rxResource<Country[], { query: string }>({

    defaultValue: [] as Country[],

    params: () => ({
      query: this.query(),
    }),

    stream: ({ params }) => {

      if (!params.query) {
        return of<Country[]>([]);
      }

      return this.countryService.searchByCountry(
        params.query
      );

    }

  });
onSearch(searchTerm: string) {
    // 1. Actualiza el signal para disparar la petición de rxResource
    this.query.set(searchTerm);

    // 2. Modifica la URL para agregar el nuevo query string
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { query: searchTerm },
      queryParamsHandling: 'merge' // Mantiene otros parámetros si los hubiera
    });
  }
}
