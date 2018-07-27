
import { Injectable } from '@angular/core';

@Injectable()
export class Globals {
  storageClient: string = sessionStorage.getItem('clientStorageUrl');
}
