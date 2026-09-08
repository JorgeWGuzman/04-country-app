import { Component, input } from '@angular/core';
import { RESTCountry } from '../../interfaces/rest-countries-interface';

@Component({
  selector: 'country-list',
  imports: [],
  templateUrl: './country-list.html',
})

export class CountryList {

  countries = input<any[]>([]);

  ngDoCheck() {
    console.log('CountryList recibe:', this.countries());
  }

}
