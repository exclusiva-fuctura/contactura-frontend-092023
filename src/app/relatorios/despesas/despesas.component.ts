import { HttpStatusCode } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
// libs
import * as moment from 'moment';
// services
import { MenuService } from 'src/app/shared/services/menu.service';
import { LancamentosService } from 'src/app/shared/services/lancamentos.service';
// enums
import { MenuTypeEnum } from 'src/app/shared/enums/menu-type.enum';

@Component({
  selector: 'app-despesas',
  templateUrl: './despesas.component.html',
  styleUrls: ['./despesas.component.scss']
})
export class DespesasComponent {

  dataSource: any[] = [];
  displayedColumns = ['data','valor','tipo','fixo','descricao','acoes'];

  formulario!: FormGroup;

  constructor(
    private menuService: MenuService,
    private formBuilder: FormBuilder,
    private lancamentosService: LancamentosService
  ) {
    // notificar ao menu em qual componente estou
    this.menuService.ondeEstou = MenuTypeEnum.RELATORIO_DESPESA;
   }

  ngOnInit(): void {
    this.initFormulario();
  }

  get valorTotal(): number {
    let total = 0;
    for (let item of this.dataSource) {
      total = total + item.valor;
    }
    return total;
  }

  private initFormulario(): void {
    this.formulario = this.formBuilder.group({
      data: moment().format()
    });
  }

  private pesquisar(): void {
   const {data} = this.formulario.value;
   this.lancamentosService.listaLancamentos().subscribe({
    next: (resp) => {
      if (resp.status === HttpStatusCode.Ok) {
        const allList = resp.body;
        if (allList) {
          this.dataSource = allList.filter( item => item.data === moment(data).format('YYYY-MM-DD') );
        }
      }
    },
    error: () => {
      this.dataSource = [];
    }
   });
  }

  onPequisar(): void {
    this.pesquisar();
  }
}
