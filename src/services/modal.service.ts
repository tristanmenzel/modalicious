import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  Injectable,
  Injector,
  ViewContainerRef
} from '@angular/core';
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

  show<TComponent>(componentClass: Type<TComponent>, providers: StaticProvider[] = []): Promise<any> {
    if (!this.rootViewContainer) throw new Error(noViewContainerRefMessage);

    return new Promise<any>((resolve, reject) => {
      let containerComponent: ComponentRef<ModalContainerComponent>;
      const containerFactory = this.factoryResolver
        .resolveComponentFactory(ModalContainerComponent);

      const close = async () => {
        await containerComponent.instance.hide();
        this.appRef.detachView(containerComponent.hostView);
        containerComponent.destroy();
      };

      const modalInstance = new ModalInstanceService(async (reason?: string) => {
        await close();
        reject(reason);
      }, async (result: any) => {
        await close();
        resolve(result);
      });

      function modalInstanceFactory() {
        return modalInstance;
      }

      const containerInjector = Injector.create({
        providers: [
          { provide: ModalInstanceService, useFactory: modalInstanceFactory, deps: [] },
        ],
        parent: this.rootViewContainer.parentInjector
      });

      containerComponent = containerFactory
        .create(containerInjector);

      if (this.defaultToFixedPositioning) {
        containerComponent.instance.useFixedPosition = true;
      }

      const modalHostView = containerComponent.instance.modalHost.viewContainerRef;

      const modalFactory = this.factoryResolver
        .resolveComponentFactory(componentClass);


      const injector = Injector.create({
        providers: [
          { provide: ModalInstanceService, useFactory: modalInstanceFactory, deps: [] },
          ...providers
        ],
        parent: this.rootViewContainer.parentInjector
      });

      const modalComponent = modalFactory
        .create(injector);

      modalHostView.insert(modalComponent.hostView);
      this.rootViewContainer.insert(containerComponent.hostView);
    });
  }
}

