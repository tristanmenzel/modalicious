import { AfterViewInit, Component, HostBinding, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { ModalHostDirective } from '../modal-host/modal-host.directive';
import { animate, state, style, transition, trigger } from '@angular/animations'
import { ModalInstanceService } from "../services/modal-instance.service";

@Component({
  selector: 'mod-modal-container',
  templateUrl: './modal-container.component.html',
  styleUrls: ['./modal-container.component.scss'],
  animations: [
    trigger('backdrop', [
      state('inactive', style({
        opacity: 0
      })),
      state('active', style({
        backgroundColor: 'rgba(0, 0, 0, .85)',
        opacity: 1
      })),
      transition('void => active', [
        style({ backgroundColor: 'rgba(0,0,0,0)' }),
        animate('50ms ease-in')
      ]),
      transition('active => inactive', [
        animate('150ms ease-out')
      ])
    ]),
    trigger('content', [
      state('hidden', style({
        opacity: 0,
        transform: 'translateY(50px)'
      })),
      state('visible', style({
        opacity: 1,
        transform: 'translateY(0)'
      })),
      transition('hidden => visible', [
        animate('150ms ease-in')
      ])
    ])
  ]
})

export class ModalContainerComponent implements AfterViewInit {

  @Input() useFixedPosition: boolean = false;

  @ViewChild(ModalHostDirective) public modalHost: ModalHostDirective;

  get backdrop() {
    return this.showBackdrop ? 'active' : 'inactive';
  }

  showContent: boolean = false;
  showBackdrop: boolean = true;

  get content() {
    return this.showContent ? 'visible' : 'hidden';
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.modalInstanceService.cancel('Escape key hit');
      event.preventDefault();
    }
  }

  @HostBinding('style.position')
  public get positionStyle() {
    return this.useFixedPosition ? 'fixed' : 'absolute';
  }

  constructor(private modalInstanceService: ModalInstanceService) {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.showContent = true;
    }, 50);
  }

  hide(): Promise<void> {
    return new Promise(resolve => {
      this.showBackdrop = false;
      setTimeout(() => {
        resolve();
      }, 200);
    });
  }
}
