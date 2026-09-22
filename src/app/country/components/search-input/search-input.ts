import { Component, input, output } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './search-input.html',
})
export class SearchInput {

  placeholder = input('Buscar');
  initialValue = input<string>('');
  value= output<string>();
}
