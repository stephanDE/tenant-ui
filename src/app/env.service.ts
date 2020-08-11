import { Injectable } from '@angular/core';

export enum Environment {
  Prod = 'prod',
  Staging = 'test',
  Dev = 'dev',
  Local = 'local',
}

@Injectable({ providedIn: 'root' })
export class EnvService {
  private _env: Environment;
  private _apiUrl: string;

  get env(): Environment {
    return this._env;
  }

  get apiUrl(): string {
    return this._apiUrl;
  }

  constructor() {}

  init(): Promise<void> {
    return new Promise(resolve => {
      this.setEnvVariables();
      resolve();
    });
  }

  private setEnvVariables(): void {
    const hostname = window && window.location && window.location.hostname;

    if (/^.*localhost.*/.test(hostname)) {
      this._env = Environment.Local;
      this._apiUrl = 'https://tenant-api.dev.78.47.57.179.xip.io/api';
    } else if (/^tenant-ui.dev/.test(hostname)) {
      this._env = Environment.Dev;
      this._apiUrl = 'https://tenant-api.dev.78.47.57.179.xip.io/api';
    } else if (/^tenant-ui.testing/.test(hostname)) {
      this._env = Environment.Staging;
      this._apiUrl = 'https://tenant-api.testing.116.203.237.159.xip.io/api';
    } else if (/^tenant-ui/.test(hostname)) {
      this._env = Environment.Prod;
      this._apiUrl = 'https://tenant-api.116.203.237.159.xip.io/api';
    } else {
      console.warn(`Cannot find environment for host name ${hostname}`);
    }
  }
}