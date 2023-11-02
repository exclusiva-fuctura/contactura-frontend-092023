import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// components
import { DespesasComponent } from './despesas/despesas.component';
import { ReceitasComponent } from './receitas/receitas.component';

const routes: Routes = [
  { path: 'despesa', component: DespesasComponent },
  { path: 'receita', component: ReceitasComponent },
  { path: 'despesa/:id', component: DespesasComponent },
  { path: 'receita/:id', component: ReceitasComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LancamentosRoutingModule { }
