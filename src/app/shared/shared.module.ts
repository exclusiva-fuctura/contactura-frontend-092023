import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// services
import { DaoService } from './services/dao.service';
import { UsuarioService } from './services/usuario.service';
import { AutorizacaoService } from './services/autorizacao.service';
import { LancamentosService } from './services/lancamentos.service';
// modules
import { MaterialModule } from '../material/material.module';
//components
import { MenuComponent } from './components/menu/menu.component';
import { LoadingComponent } from './components/loading/loading.component';
import { LogoutComponent } from './components/logout/logout.component';
import { MenuService } from './services/menu.service';
import { HttpClientModule } from '@angular/common/http';
import { DinheiroDirective } from './directives/dinheiro.directive';
import { MaiusculoDirective } from './directives/maiusculo.directive';

const componentes = [
  MenuComponent,
  LoadingComponent,
  LogoutComponent
];

const directives = [
  DinheiroDirective,
  MaiusculoDirective
];

@NgModule({
  declarations: [
    componentes,
    directives
  ],
  imports: [
    CommonModule,
    MaterialModule,
    HttpClientModule
  ], 
  exports: [
    componentes,
    directives
  ],
  providers: [
    DaoService,
    MenuService,
    UsuarioService,
    AutorizacaoService,
    LancamentosService,
    { provide: LOCALE_ID, useValue: 'pt' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
  ]
})
export class SharedModule { }
