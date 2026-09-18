import { Component, input } from '@angular/core';

import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'country-list',
  imports: [DecimalPipe, RouterLink],
  templateUrl: './country-list.html',
})

export class CountryList {

  countries = input<any[]>([]);

  errorMessage = input<string | unknown | null>();
  isloading = input<boolean>(false);
  isempty = input<boolean>(false);

  ngDoCheck() {
    console.log('CountryList recibe:', this.countries());
  }

}
