import { Component, effect, input, linkedSignal, output, signal } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './search-input.html',
})
export class SearchInput {

  placeholder = input('Buscar');
  initialValue = input<string>('');
  value= output<string>();
  debounceTime = input(300);


  inputValue = linkedSignal<string>(()=> this.initialValue() ?? '');

  debounceEffect = effect((onCleanup) => {
    const value = this.inputValue();
    const timeout = setTimeout(() => {
      this.value.emit(value);
  },this.debounceTime());

  onCleanup(() => {
    clearTimeout(timeout);
  });

})
}
