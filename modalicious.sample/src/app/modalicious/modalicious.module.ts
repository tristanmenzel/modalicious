import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ModalService} from './modal.service';
import { ModalContainerComponent } from './modal-container/modal-container.component';
import { ModalHostDirective } from './modal-host.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    ModalService
  ],
  entryComponents:[
    ModalContainerComponent
  ],
  declarations: [ModalContainerComponent, ModalHostDirective]
})
export class ModaliciousModule { }
