import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ComponentsModule } from './components/components.module';
import { DirectivesModule } from './directives/directives.module';

@NgModule({
  imports: [],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    ComponentsModule,
    DirectivesModule,
  ],
  providers: [],
  declarations: [],
})
export class CommonModule {}
