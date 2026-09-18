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
import { Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';

import { SearchInput } from '../../components/search-input/search-input';
import { CountryList } from '../../components/country-list/country-list';
import { CountryService } from '../../services/country';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-country-page',
  imports: [SearchInput, CountryList],
  templateUrl: './by-country-page.html',
})
export class ByCountryPage {

  countryService = inject(CountryService);
  query = signal('');

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

}
