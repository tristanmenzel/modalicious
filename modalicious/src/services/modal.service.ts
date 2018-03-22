import { ApplicationRef, ComponentFactoryResolver, Injectable, Injector, ViewContainerRef } from '@angular/core';
import { Type } from '@angular/core/src/type';
import { ModalContainerComponent } from '../modal-container/modal-container.component';
import { ModalInstanceService } from "./modal-instance.service";
import { StaticProvider } from "@angular/core/src/di/provider";


const noViewContainerRefMessage =
  `Modalicious: You must call setRootViewContainerRef on ModalService from your root component before calling ModalService.show()`;

@Injectable()
export class ModalService {
  private rootViewContainer: ViewContainerRef;
  private defaultToFixedPositioning: boolean;

  constructor(private factoryResolver: ComponentFactoryResolver,
              private appRef: ApplicationRef) {
  }

  setModalPositioning(useFixed: boolean) {
    this.defaultToFixedPositioning = useFixed;
  }

  setRootViewContainerRef(viewContainerRef: ViewContainerRef) {
    this.rootViewContainer = viewContainerRef;
  }

  show<TResult, TComponent>(componentClass: Type<TComponent>, providers:StaticProvider[] = []): Promise<TResult> {
    if (!this.rootViewContainer) throw new Error(noViewContainerRefMessage);

    return new Promise<TResult>((resolve, reject) => {

      const containerFactory = this.factoryResolver
        .resolveComponentFactory(ModalContainerComponent);
      const containerComponent = containerFactory
        .create(this.rootViewContainer.parentInjector);

      if (this.defaultToFixedPositioning) {
        containerComponent.instance.useFixedPosition = true;
      }

      const modalHostView = containerComponent.instance.modalHost.viewContainerRef;

      const modalFactory = this.factoryResolver
        .resolveComponentFactory(componentClass);

      const close = () => {
        this.appRef.detachView(containerComponent.hostView);
        containerComponent.destroy();
      };

      const modalInstance = new ModalInstanceService((reason?: string) => {
        close();
        reject(reason);

      }, (result: any) => {
        close();
        resolve(result);
      });

      const injector = Injector.create([
        { provide: ModalInstanceService, useValue: modalInstance },
        ...providers
      ], this.rootViewContainer.parentInjector);

      const modalComponent = modalFactory
        .create(injector);

      modalHostView.insert(modalComponent.hostView);
      this.rootViewContainer.insert(containerComponent.hostView);
    });
  }
}

