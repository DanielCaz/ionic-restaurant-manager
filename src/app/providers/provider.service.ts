/* eslint-disable no-underscore-dangle */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Provider } from './provider';

@Injectable({
  providedIn: 'root',
})
export class ProviderService {
  constructor(private http: HttpClient) {}

  getProviders() {
    return this.http.get<Provider[]>(`${environment.apiUrl}/providers`);
  }

  addProvider(provider: Provider) {
    return this.http.post<Provider>(
      `${environment.apiUrl}/providers`,
      provider
    );
  }

  deleteProvider(provider: Provider) {
    return this.http.delete<Provider>(
      `${environment.apiUrl}/providers/${provider._id}`
    );
  }

  updateProvider(provider: Provider) {
    return this.http.patch<Provider>(
      `${environment.apiUrl}/providers/${provider._id}`,
      provider
    );
  }
}
