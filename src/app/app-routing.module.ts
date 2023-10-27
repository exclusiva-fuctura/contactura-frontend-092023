import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DespesasComponent } from './relatorios/despesas/despesas.component';
import { ReceitasComponent } from './relatorios/receitas/receitas.component';

const routes: Routes = [
  {path: '', redirectTo:'login', pathMatch:'full'},
  {path:'login', component: LoginComponent},
  {path:'cadastro', component: CadastroComponent},
  {path:'inicial', component: DashboardComponent},
  {path: 'relatorios/despesas', component: DespesasComponent},
  {path: 'relatorios/receitas', component: ReceitasComponent},
  {path:'**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
