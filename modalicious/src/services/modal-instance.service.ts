export class ModalInstanceService {
  constructor(public cancel: (reason?: string) => void,
              public resolve: (result?: any) => void) {

  }
}