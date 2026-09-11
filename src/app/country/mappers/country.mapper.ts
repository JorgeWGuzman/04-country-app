import type { Country } from '../interfaces/country.interface';
import type { Object as RestCountry } from '../interfaces/rest-countries-interfase-2';

export class CountryMapper {

  // RestCountry => Country
  static mapRestCountryToCountry(restCountry: RestCountry): Country {


    console.log(restCountry.capitals[0]);

    return {
      alpha2: restCountry.codes.alpha_2,
      alpha3: restCountry.codes.alpha_3,

      flag: restCountry.flag.emoji,
      flagSvg: restCountry.flag.url_svg,

      name: restCountry.names.translations['spa']?.official ?? restCountry.names.official,

      capital: restCountry.capitals[0]?.name ?? '',

      population: restCountry.population,

      region: restCountry.region,

      subRegion: restCountry.subregion,
    };

  }

  // RestCountry[] => Country[]
  static mapRestCountryArrayToCountryArray(
    restCountries: RestCountry[]
  ): Country[] {

    return restCountries.map(
      this.mapRestCountryToCountry
    );

  }

}
