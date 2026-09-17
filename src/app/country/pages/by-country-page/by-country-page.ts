import { Component, inject, resource, signal } from '@angular/core';
import { SearchInput } from "../../components/search-input/search-input";
import { CountryList } from "../../components/country-list/country-list";
import { CountryService } from '../../services/country';
import { firstValueFrom, of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-by-country-page',
  imports: [SearchInput, CountryList],
  templateUrl: './by-country-page.html',
})
export class ByCountryPage {

  countryService = inject(CountryService);
  query = signal('');

  countryResource = resource({
    params: () => ({ query: this.query() }),

    loader: async({ params }) => {
       if (!params.query) return [];

       return await firstValueFrom(
         // Invocamos el nuevo método que busca por el endpoint /name/
         this.countryService.searchByCountry(params.query)
       );
    },
  });
}
