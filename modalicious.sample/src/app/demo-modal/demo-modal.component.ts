import {Component, HostBinding, Inject, InjectionToken, OnInit} from '@angular/core';
import {ModalInstanceService} from 'modalicious';

export const DemoModalColor = new InjectionToken<string>('demo-modal.color');

@Component({
  selector: 'app-demo-modal',
  templateUrl: './demo-modal.component.html',
  styleUrls: ['./demo-modal.component.scss']
})
export class DemoModalComponent implements OnInit {

  @HostBinding('style.color') color: string;

  constructor(private modalInstance: ModalInstanceService,
              @Inject('name') public name: string,
              @Inject(DemoModalColor) color: string) {
    this.color = color;
  }

  ngOnInit() {
  }

  close() {
    this.modalInstance.resolve();
  }

}
