import { Component, inject } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'not-found',
  imports: [],
  templateUrl: './not-found.html',
})
export class NotFound {

    location = inject(Location);

    goBack() {
        this.location.back();
    }

}
