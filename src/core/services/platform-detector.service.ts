import { Injectable } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',  
})
export class PlatformDetectorService {
  constructor(@Inject(PLATFORM_ID) private platformId: any) {}


  isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }
}
