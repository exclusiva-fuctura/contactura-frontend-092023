import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LancamentosRoutingModule } from './lancamentos-routing.module';
import { DespesasComponent } from './despesas/despesas.component';
import { ReceitasComponent } from './receitas/receitas.component';


@NgModule({
  declarations: [
    DespesasComponent,
    ReceitasComponent
  ],
  imports: [
    CommonModule,
    LancamentosRoutingModule
  ]
})
export class LancamentosModule { }
