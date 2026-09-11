import { Component, input } from '@angular/core';

import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'country-list',
  imports: [DecimalPipe],
  templateUrl: './country-list.html',
})

export class CountryList {

  countries = input<any[]>([]);

  ngDoCheck() {
    console.log('CountryList recibe:', this.countries());
  }

}
