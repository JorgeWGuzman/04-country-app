import { Component, input, output } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'country-list',
  imports: [DecimalPipe, RouterLink],
  templateUrl: './country-list.html',
})
export class CountryList {
  countries = input<any[]>([]);
  errorMessage = input<string | null>(null);
  isloading = input<boolean>(false);
  query = input<string>('');

  // 👇 Creamos el emisor de eventos para cuando hagan clic en "Regresar"
  onReset = output<void>();

  resetSearch() {
    this.onReset.emit();
  }
}
