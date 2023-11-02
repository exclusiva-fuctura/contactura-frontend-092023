import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { HttpStatusCode } from '@angular/common/http';
// libs
import Swal from 'sweetalert2';
// services
import { MenuService } from '../shared/services/menu.service';
import { LancamentosService } from '../shared/services/lancamentos.service';
// models
import { IReceita } from './../shared/models/receita.interface';
import { IDespesa } from '../shared/models/despesa.interface';
// enums
import { MenuTypeEnum } from '../shared/enums/menu-type.enum';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  dataSourceDespesas: any[] = [];
  dataSourceReceitas: any[] = [];
  displayedColumns = ['data','valor','tipo','fixo','descricao','acoes'];

  constructor(
    private router: Router,
    private menuService: MenuService,
    private lancamentoService: LancamentosService
  ) {
    // notificar ao menu em qual componente estou
    this.menuService.ondeEstou = MenuTypeEnum.DASHBOARD;

    // buscar Despesas
    this.pesquisar();
   }

  private pesquisar(): void {
    this.lancamentoService.listaLancamentos().subscribe({
      next: (response) => {
        const lista = response.body;
        if (lista) {
          // despesas
          this.dataSourceDespesas = lista.filter( lanc => lanc.ehReceita === false).slice(0, 3);
          // receita
          this.dataSourceReceitas = lista.filter( lanc => lanc.ehReceita === true).slice(0, 3);
        }
      }
    });
  }

  private removeDespesa(item: IDespesa) : void {
    if (item) {
      this.lancamentoService.removerDespesa(item).subscribe({
        next: (response) => {
          if (response.status === HttpStatusCode.Ok) {
            Swal.fire(
              'SUCESSO: Remover Despesa',
              `Despesa removida com sucesso.`,
              'success'
              );
            // nova consulta
            this.pesquisar();
          }
        },
        error: (err) => {
          Swal.fire(
            'ALERTA: Remover Despesa',
            err.error.mensagem ? err.error.mensagem : 'Ocorreu um erro inesperado. [ ' + err.error.error + ' ]',
            'warning'
            );
        }
      });
    }
  }

  private removeReceita(item: IReceita) : void {
    if (item) {
      this.lancamentoService.removerReceita(item).subscribe({
        next: (response) => {
          if (response.status === HttpStatusCode.Ok) {
            Swal.fire(
              'SUCESSO: Remover Receita',
              `Receita removida com sucesso.`,
              'success'
              );
            // nova consulta
            this.pesquisar();
          }
        },
        error: (err) => {
          Swal.fire(
            'ALERTA: Remover Receita',
            err.error.mensagem ? err.error.mensagem : 'Ocorreu um erro inesperado. [ ' + err.error.error + ' ]',
            'warning'
            );
        }
      });
    }
  }

  onEditDespesa(item: IDespesa): void {
    if (item) {
      this.lancamentoService.modoEdicao = true;
      this.lancamentoService.despesaSelecionada = item;
      this.router.navigate(['lancamentos/despesa/'+item.id]);
    }
  }

  onEditReceita(item: IReceita): void {
    if (item) {
      this.lancamentoService.modoEdicao = true;
      this.lancamentoService.receitaSelecionada = item;
      this.router.navigate(['lancamentos/receita/'+item.id]);
    }
  }

  onDeleteDespesa(item: IDespesa): void {
    if (item) {
      Swal.fire({
        title: 'Remover Despesa',
        text: `Deseja remover a despesa '${item.descricao.toUpperCase()}'?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, remova!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.removeDespesa(item)
        }
      });
    }
  }

  onDeleteReceita(item: IReceita): void {
    if (item) {
      Swal.fire({
        title: 'Remover Receita',
        text: `Deseja remover a receita '${item.descricao.toUpperCase()}'?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, remova!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.removeReceita(item)
        }
      });
    }
  }
}
