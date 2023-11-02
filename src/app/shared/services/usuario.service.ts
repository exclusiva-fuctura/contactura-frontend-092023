import { Injectable } from '@angular/core';
import { AppState } from 'src/app/app.state';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private state: AppState
  ) { }

  get token(): string {
    return this.state.token;
  }

  set token(valor: any) {
    this.state.token = valor;
  }

  get usuarioLogado(): boolean {
    return this.token && this.token.length > 10 ? true : false;
  }
}
