import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CookieService {
  private platformId = inject(PLATFORM_ID);

  setCookie(name: string, value: string, days: number = 7, secure: boolean = false): void {
    if (isPlatformBrowser(this.platformId)) {
      const expires = new Date();
       expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000)); // 7day

       let cookieString =  `${name}=${value};expires=${expires.toUTCString()};path=/`;

        // If secure is true, add secure and samesite attributes
       if (secure) {
        cookieString += ';secure;samesite=strict';
       }

       document.cookie  = cookieString;
    }
  }

  getCookie(name: string): string | null {
    if (isPlatformBrowser(this.platformId)) {
      const nameEQ = `${name}=`;
      const ca = document.cookie.split(';');

      // Split cookies into an array and search for the specified cookie
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
          c = c.substring(1, c.length);
        }
        // Check if the cookie starts with the specified name
        if (c.indexOf(nameEQ) === 0) {
          return c.substring(nameEQ.length, c.length);
        }
      }
    }
    
    return null;
  }

  deleteCookie(name: string): void {
    if (isPlatformBrowser(this.platformId)) {
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
    }
  }
  
}
