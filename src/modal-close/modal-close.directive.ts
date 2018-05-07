import { Directive, HostListener, Input } from '@angular/core';
import { ModalInstanceService } from "../services/modal-instance.service";

@Directive({
  selector: '[mod-modal-close]'
})
export class ModalCloseDirective {

  @Input('mod-modal-close')
  public value: any = null;

  constructor(private modalInstance: ModalInstanceService) {
  }

  @HostListener('click')
  close() {
    this.modalInstance.resolve(this.value);
  }
}
