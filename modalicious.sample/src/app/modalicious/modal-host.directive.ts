import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[mod-modal-host]'
})
export class ModalHostDirective {

  constructor(public viewContainerRef: ViewContainerRef) {
  }

}
