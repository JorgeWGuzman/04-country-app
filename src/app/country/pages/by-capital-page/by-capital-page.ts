import { Component, inject, linkedSignal, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop'; // 1. Nueva importación para rxResource
import { SearchInput } from "../../components/search-input/search-input";
import { CountryList } from "../../components/country-list/country-list";
import { CountryService } from '../../services/country';
import { Country } from '../../interfaces/country.interface';
import { Observable, of } from 'rxjs'; // 2. Importamos 'of' de rxjs
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-by-capital-page',
  imports: [SearchInput, CountryList],
  templateUrl: './by-capital-page.html',
})
export class ByCapitalPage {
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


    return this.countryService.searchByCapital(
      params.query);
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



