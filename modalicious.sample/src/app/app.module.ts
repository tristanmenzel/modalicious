import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {DemoModalComponent} from './demo-modal/demo-modal.component';
import {ModaliciousModule} from './modalicious/modalicious.module';


@NgModule({
  declarations: [
    AppComponent,
    DemoModalComponent
  ],
  imports: [
    BrowserModule,
    ModaliciousModule
  ],
  providers: [],
  entryComponents: [
    DemoModalComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
