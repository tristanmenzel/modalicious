import {ComponentFactoryResolver, Injectable, ViewContainerRef} from '@angular/core';
import {Type} from '@angular/core/src/type';
import {ModalContainerComponent} from './modal-container/modal-container.component';


const noViewContainerRefMessage =
  `Modalicious: You must call setRootViewContainerRef on ModalService from your root component before calling showModal`;

@Injectable()
export class ModalService {
  private rootViewContainer: ViewContainerRef;

  constructor(private factoryResolver: ComponentFactoryResolver) {
  }

  setRootViewContainerRef(viewContainerRef: ViewContainerRef) {
    this.rootViewContainer = viewContainerRef;
  }

  showModal<T>(componentClass: Type<T>) {
    if (!this.rootViewContainer) throw new Error('You must call ');


    const containerFactory = this.factoryResolver
      .resolveComponentFactory(ModalContainerComponent);
    const containerComponent = containerFactory
      .create(this.rootViewContainer.parentInjector);

    const modalHostView = containerComponent.instance.modalHost.viewContainerRef;

    const modalFactory = this.factoryResolver
      .resolveComponentFactory(componentClass);

    const modalComponent = modalFactory
      .create(modalHostView.parentInjector);

    modalHostView.insert(modalComponent.hostView);
    this.rootViewContainer.insert(containerComponent.hostView);
  }
}
