import { Component, HostBinding, Input, OnInit, ViewChild } from '@angular/core';
import { ModalHostDirective } from '../modal-host/modal-host.directive';

@Component({
  selector: 'mod-modal-container',
  templateUrl: './modal-container.component.html',
  styleUrls: ['./modal-container.component.scss']
})
export class ModalContainerComponent {

  @Input() useFixedPosition: boolean = false;

  @ViewChild(ModalHostDirective) public modalHost: ModalHostDirective;

  @HostBinding('style.position')
  private get positionStyle() {
    return this.useFixedPosition ? 'fixed' : 'absolute';
  }

  constructor() {
  }

}
