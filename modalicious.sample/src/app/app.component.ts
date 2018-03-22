import {Component, ViewContainerRef} from '@angular/core';
import {ModalService} from 'modalicious';
import {DemoModalColor, DemoModalComponent} from './demo-modal/demo-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private modalService: ModalService, viewContainerRef: ViewContainerRef) {
    this.modalService.setRootViewContainerRef(viewContainerRef);
    this.modalService.setModalPositioning(true);
  }

  async showTheDemoModal() {
    const res = await this.modalService.show<number, DemoModalComponent>(DemoModalComponent, [
      { provide: 'name', useValue: 'Jimmy Two Shoes'},
      { provide: DemoModalColor, useValue: '#1140ff'}
    ]);
    console.log(res);
  }
}
