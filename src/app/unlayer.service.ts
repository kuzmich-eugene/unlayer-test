import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UnlayerService {

  constructor(
    private http: HttpClient
  ) {}

  getUnlayerTemplates() {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json')
    headers.append('Authorization', 'Basic j1xExZHZN5g7oeasoeiSB10y3987Q8nXgMfCDoDn4EksuP9wwThZnbL1zMYelNmy');
    return this.http.get<any>('https://us-central1-brandyoo-staging.cloudfunctions.net/api/v1/unlayer/get-templates/', { headers }).pipe(
      map((templates: any) => templates.data)
    );
  }
}
