import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';

import { CountryService } from '../../services/country';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-country-page',
  imports: [],
  templateUrl: './country-page.html',
})
export class CountryPage {

  countryCode = inject(ActivatedRoute)
    .snapshot.params['code'];

  countryService = inject(CountryService);

  countryResource = rxResource<Country, { code: string }>({

    params: () => ({
      code: this.countryCode,
    }),

    stream: ({ params }) => {

      return this.countryService
        .searchCountryByAlphaCode(
          params.code
        );

    },

  });

}

