import { Component, inject, resource, signal } from '@angular/core';
import { SearchInput } from "../../components/search-input/search-input";
import { CountryList } from "../../components/country-list/country-list";
import { CountryService } from '../../services/country';
import { Country } from '../../interfaces/country.interface';
import { first, firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-by-capital-page',
  imports: [SearchInput, CountryList],
  templateUrl: './by-capital-page.html',
})
export class ByCapitalPage {
  countryService = inject(CountryService);
  query = signal('');


  countryResource = resource({
  // 1. Cambia 'request' por 'params' en la función reactiva
  params: () => ({ query: this.query() }),

  // 2. Desestructura 'params' en lugar de 'request' en el loader
  loader: async({ params }) => {
     if (!params.query) return [];

     return await firstValueFrom(
       // 3. Usa params.query para la petición
       this.countryService.searchByCapital(params.query)
     );
  },
});
}
//   isLoading = signal(false);
//   isError = signal<string|null>(null);
//   countries = signal<Country[]>([]);

//   onSearch(query: string) {
//     if (this.isLoading()) return;
//     this.isLoading.set(true);
//     this.isError.set(null);

// this.countryService.searchByCapital(query).subscribe({
//   next: (countries) => {

//   this.isLoading.set(false);

//   if (countries.length === 0) {
//     this.countries.set([]);
//     this.isError.set(
//       `No se encontró un país con esa capital: ${query}`
//     );
//     return;
//   }

//   this.countries.set(countries);
// },
// })
//     }
//   }
