# Modalicious

A bare-bones modal service for Angular which gives you full control over the actual modal window's appearance.

## Installation

`npm i -S modalicious`

## Usage

### Setup 

Choose between fixed positioning or absolute. Absolute is recommended as mobile safari has issues rending text fields
in fixed position elements and the work-arounds force the user to the top of the page when a modal is opened. For 
absolute positioning you will need to apply the following styles to force scroll bars to appear in the root component
instead of the body. 

```scss
/* style.scss */

html, body {
  height: 100%;
  overflow: hidden;
  padding: 0;
  margin: 0;
}
```

```scss
/* app.component.scss */
:host {
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
  display: block;
}
```

### Config

Import the module

```ts
/* app.module.ts */

@NgModule({
  ...
  imports: [
    ...,
    ModaliciousModule.forRoot()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

```

Set the root view container ref and optionally change modal positioning

```ts
/* app.component.ts */
export class AppComponent {
  constructor(private modalService: ModalService, 
              viewContainerRef: ViewContainerRef) {
    this.modalService.setRootViewContainerRef(viewContainerRef);
    
    // Can be omitted if using default of false.
    this.modalService.setModalPositioning(/* useFixed */ false); 
  }
}

```

### Action!

Any directives you wish to use as a modal should be registered in your `module` as an `entryComponent`

```ts
/* app.module.ts */
@NgModule({
  ...
  declarations: [
    DemoModalComponent
  ],
  entryComponents: [
    DemoModalComponent
  ],
  bootstrap: [AppComponent]
})
``` 

Take a dependency on `ModalService` and call `show()` 

```ts
export class AnyComponent {
  constructor(private modalService: ModalService) {
  }
  
  async showTheDemoModal() {
    // You can optionally await a response from the modal when it is closed (see below)
    const res = await this.modalService.show<number, DemoModalComponent>(DemoModalComponent);
  }
}
```

### Closing or cancelling a modal

In order to to close a modal and dispose of the rendered template you will need to resolve a `ModalInstanceService` in _your_
modal component and invoke one of the available methods. The optional resolve param will be passed back to the `Promise`
returned by `ModalService.show()`. Cancelling the modal will result in a rejected `Promise`. 

```ts
/* demo-modal.component.ts */
export class DemoModalComponent {
  constructor(private modalInstance: ModalInstanceService) {
  }

  close() {
    this.modalInstance.resolve(/* Optional value to resolve */);
  }
  
  cancel() {
    this.modalInstance.cancel('User cancelled');
  }
}

```

### Close Modal directive

As a short-hand way of binding a click handler to an element to close a dialog, one can use the `mod-close-modal` directive
on any appropriate form element. The directive can be bound with an optional value to be returned to the `resolve` method.

```html
<!-- demo-modal.component.html -->
<button class="close-button" mod-modal-close>X</button>
<p>
Modal text blah blah.
</p>
<button class="yes-button" [mod-modal-close]="'Yes'">Yes</button>
```