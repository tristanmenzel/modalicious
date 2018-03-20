import {Component, OnInit} from '@angular/core';
import {ModalInstance} from 'modalicious';

@Component({
  selector: 'app-demo-modal',
  templateUrl: './demo-modal.component.html',
  styleUrls: ['./demo-modal.component.scss']
})
export class DemoModalComponent implements OnInit {

  constructor(private modalInstance: ModalInstance) {
  }

  ngOnInit() {
  }

  close() {
    this.modalInstance.close();
  }

}
