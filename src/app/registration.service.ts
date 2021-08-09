import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private _http: HttpClient) { }

  _url = 'http://localhost:3000/enroll'; // url where we post the data
  
  register(userData: FormGroup) {
    return this._http.post<any>(this._url, userData);
  }
}
