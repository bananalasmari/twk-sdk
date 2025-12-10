export interface TWKSDKInitOptions {
  apiBase: string;
  sharedSecret: string;
  enableLog?: boolean;
}

declare global {
  interface Window {
    TWK: any;
    TWKAPIBASE?: string;
    SHAREDSECRET?: string;
    ENABLELOG?: boolean;
  }
}

/**
 * Lightweight SDK wrapper around the global TWK bridge defined in assets/js/twkhelper.js
 *
 * This can be used from any TypeScript / JavaScript host (Angular or non‑Angular)
 * to talk to the TWK web‑view in a typed, Promise‑based way.
 */
export class TWKSDK {
  /**
   * Configure base URL and security parameters used by the underlying TWK helper.
   * Call this once during application startup (before the first TWK call).
   */
  static init(options: TWKSDKInitOptions): void {
    window.TWKAPIBASE = options.apiBase;
    window.SHAREDSECRET = options.sharedSecret;
    window.ENABLELOG = options.enableLog ?? false;
  }

  private static ensureTwk(methodName?: string): any {
    const twk = window.TWK;
    if (!twk) {
      throw new Error('TWK bridge is not available. Make sure assets/js/twkhelper.js is loaded in the host page.');
    }
    if (methodName && typeof twk[methodName] !== 'function' && !(twk.V2 && typeof twk.V2[methodName] === 'function')) {
      throw new Error(`TWK method "${methodName}" is not available on the bridge.`);
    }
    return twk;
  }

  /** Returns raw device capabilities, including appearance (light / dark) and language. */
  static async getDeviceInfo(): Promise<any> {
    const twk = this.ensureTwk('getDeviceInfo');
    return twk.getDeviceInfo();
  }

  /** Convenient helper to read only the appearance number from device info (1 = light, 2 = dark). */
  static async getAppearance(): Promise<number | null> {
    const info = await this.getDeviceInfo();
    if (info?.success && typeof info.result?.appearance === 'number') {
      return info.result.appearance;
    }
    return null;
  }

  /** Returns the full name of the signed‑in user (uses v2 endpoint when available). */
  static async getUserFullName(): Promise<string | null> {
    const twk = this.ensureTwk();
    const fn =
      twk.V2 && typeof twk.V2.getUserFullName === 'function'
        ? twk.V2.getUserFullName.bind(twk.V2)
        : twk.getUserFullName?.bind(twk);

    if (!fn) {
      throw new Error('TWK does not expose getUserFullName on either TWK or TWK.V2.');
    }

    const response = await fn();
    if (response?.success) {
      // v1 / v2 may return plain value or wrapped result; keep it flexible
      return typeof response.result === 'string' ? response.result : response.result?.full_name ?? null;
    }
    return null;
  }

  /** Example wrapper: fetches the user vehicles list if the host exposes it. */
  static async getUserVehicles(): Promise<any> {
    const twk = this.ensureTwk('getUserVehicles');
    return twk.getUserVehicles();
  }
}



