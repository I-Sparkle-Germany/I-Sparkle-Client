import { NgModule } from '@angular/core';
import { StandaloneLogoComponent } from './standalone-logo/standalone-logo.comonent';

@NgModule({
  declarations: [StandaloneLogoComponent],
  exports: [StandaloneLogoComponent]
})
export class StandaloneModule {}
