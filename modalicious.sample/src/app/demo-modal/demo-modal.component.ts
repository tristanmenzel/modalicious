import {Component, OnInit} from '@angular/core';
import {ModalInstanceService} from 'modalicious';

@Component({
  selector: 'app-demo-modal',
  templateUrl: './demo-modal.component.html',
  styleUrls: ['./demo-modal.component.scss']
})
export class DemoModalComponent implements OnInit {

  constructor(private modalInstance: ModalInstanceService) {
  }

  ngOnInit() {
  }

  close() {
    this.modalInstance.resolve();
  }

}
