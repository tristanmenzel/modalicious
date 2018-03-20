import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from './services/modal.service';
export { ModalService, ModalInstance } from './services/modal.service'
import { ModalContainerComponent } from './modal-container/modal-container.component';
import { ModalHostDirective } from './modal-host/modal-host.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    ModalService
  ],
  entryComponents: [
    ModalContainerComponent
  ],
  declarations: [ModalContainerComponent, ModalHostDirective]
})
export class ModaliciousModule {
}
