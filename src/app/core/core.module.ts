import { NgModule, Optional, SkipSelf } from '@angular/core';

@NgModule({
  declarations: [

  ],
  imports: [

  ],
  exports: [

  ]
})
export class CoreModule {

  constructor(@Optional() @SkipSelf() core:CoreModule) {
    if (core) {
      throw new Error("Core se importeaza doar in root module");
    }
  }
}
