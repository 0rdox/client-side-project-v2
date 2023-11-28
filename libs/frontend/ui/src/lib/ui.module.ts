import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  imports: [CommonModule, RouterModule], 
  declarations: [HeaderComponent, FooterComponent, SpinnerComponent],
  exports: [HeaderComponent, FooterComponent, SpinnerComponent],
})
export class UiModule {}
