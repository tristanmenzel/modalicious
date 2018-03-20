import { ApplicationRef, ComponentFactoryResolver, Injectable, Injector, ViewContainerRef } from '@angular/core';
import { Type } from '@angular/core/src/type';
import { ModalContainerComponent } from '../modal-container/modal-container.component';


const noViewContainerRefMessage =
  `Modalicious: You must call setRootViewContainerRef on ModalService from your root component before calling showModal`;

@Injectable()
export class ModalService {
  private rootViewContainer: ViewContainerRef;

  constructor(private factoryResolver: ComponentFactoryResolver,
              private appRef: ApplicationRef) {
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

    const modalInstance = new ModalInstance(() => {
      this.appRef.detachView(containerComponent.hostView);
      containerComponent.destroy();
    });

    const injector = Injector.create([
      { provide: ModalInstance, useValue: modalInstance }
    ], this.rootViewContainer.parentInjector);

    const modalComponent = modalFactory
      .create(injector);

    modalHostView.insert(modalComponent.hostView);
    this.rootViewContainer.insert(containerComponent.hostView);
  }
}

export class ModalInstance {
  constructor(public close: () => void) {

  }
}
