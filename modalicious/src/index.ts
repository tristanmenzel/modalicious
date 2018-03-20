import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from './services/modal.service';
import { ModalContainerComponent } from './modal-container/modal-container.component';
import { ModalHostDirective } from './modal-host/modal-host.directive';
import { ModalCloseDirective } from "./modal-close/modal-close.directive";

export { ModalService } from './services/modal.service'
export { ModalInstanceService } from './services/modal-instance.service'
export { ModalCloseDirective } from "./modal-close/modal-close.directive";

@NgModule({
  imports: [
    CommonModule
  ],
  entryComponents: [
    ModalContainerComponent
  ],
  declarations: [ModalContainerComponent, ModalHostDirective, ModalCloseDirective],
  exports: [
    ModalCloseDirective
  ]
})
export class ModaliciousModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ModaliciousModule,
      providers: [ModalService]
    }
  }
}
