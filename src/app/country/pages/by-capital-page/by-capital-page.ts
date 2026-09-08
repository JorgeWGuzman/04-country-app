import { Component, inject, signal } from '@angular/core';
import { SearchInput } from "../../components/search-input/search-input";
import { CountryList } from "../../components/country-list/country-list";
import { Country } from '../../services/country';
import { RESTCountry } from '../../interfaces/rest-countries-interface';

@Component({
  selector: 'app-by-capital-page',
  imports: [SearchInput, CountryList],
  templateUrl: './by-capital-page.html',
})
export class ByCapitalPage {
  countryService = inject(Country);

  // isLoading = signal(false)
  // isError = signal<string|null>(null)
  // countries = signal<RESTCountry[]>([])
  countries = signal<any[]>([]);

  onSearch(query: string) {
    // if (this.isLoading()) return;
    // this.isLoading.set(true);
    // this.isError.set(null);

this.countryService.searchByCapital(query).subscribe((response) => {

  this.countries.set(response.data.objects);
  console.log('Countries Signal');
  console.log(this.countries());

});
    }
  }
