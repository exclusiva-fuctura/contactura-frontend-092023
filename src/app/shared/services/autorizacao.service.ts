import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// libs
import { Observable } from 'rxjs';
// services
import { DaoService } from './dao.service';
// models
import { ILogin } from '../models/login.interface';
// constants
import { AppSettings } from 'src/app/app.settings';

@Injectable({
  providedIn: 'root'
})
export class AutorizacaoService {

  constructor(
    private daoService: DaoService
  ) { }

  autenticar(login: ILogin): Observable<HttpResponse<ILogin>> {
    return this.daoService.post<ILogin>(AppSettings.API_AUTENTICADOR, login, DaoService.MEDIA_TYPE_APP_JSON)
  } 
}
