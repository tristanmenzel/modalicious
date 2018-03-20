import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalHostDirective } from '../modal-host/modal-host.directive';

@Component({
  selector: 'mod-modal-container',
  templateUrl: './modal-container.component.html',
  styleUrls: ['./modal-container.component.scss']
})
export class ModalContainerComponent implements OnInit {

  @ViewChild(ModalHostDirective) public modalHost: ModalHostDirective;

  constructor() {
  }

  ngOnInit() {
  }

}
