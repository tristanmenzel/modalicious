import {Component, ViewContainerRef} from '@angular/core';
import {ModalService} from './modalicious/modal.service';
import {DemoModalComponent} from './demo-modal/demo-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private modalService: ModalService, viewContainerRef: ViewContainerRef) {
    this.modalService.setRootViewContainerRef(viewContainerRef);
  }

  go() {
    this.modalService.showModal(DemoModalComponent);
  }
}
