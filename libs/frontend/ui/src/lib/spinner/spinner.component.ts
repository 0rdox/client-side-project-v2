import { Component } from '@angular/core';


@Component({
  selector: 'client-side-project-spinner',
  template: `
    <div class="lds-ellipsis">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  `,
  styleUrls: ['./spinner.component.css'],
})
export class SpinnerComponent {}
