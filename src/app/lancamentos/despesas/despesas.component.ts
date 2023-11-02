import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// libs
import * as moment from 'moment';
import Swal from 'sweetalert2';
// services
import { MenuService } from 'src/app/shared/services/menu.service';
import { LancamentosService } from 'src/app/shared/services/lancamentos.service';
// enums
import { MenuTypeEnum } from 'src/app/shared/enums/menu-type.enum';
// models
import { IDespesa } from 'src/app/shared/models/despesa.interface';

@Component({
  selector: 'app-despesas',
  templateUrl: './despesas.component.html',
  styleUrls: ['./despesas.component.scss']
})
export class DespesasComponent implements OnInit {

  formulario!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private menuService: MenuService,
    private activatedRoute: ActivatedRoute,
    private lancamentosService: LancamentosService
  ) { }

  ngOnInit(): void {
    this.menuService.ondeEstou = MenuTypeEnum.LANCAMENTO_DESPESA;
    this.iniciarFormulario();

    const id = this.activatedRoute.snapshot.params['id'];
    if (id) {
      this.verificarModoEdicao();
    } else {
      this.lancamentosService.modoEdicao = false;
    }
  }


  /**
   * label do botão dinâmico
   */
  get buttonLabel(): string {
    return this.lancamentosService.modoEdicao ? 'Editar' : 'Salvar';
  }

  /**
   * listagem dos tipos
   */
  get tipos(): string[] {
    return ['Alimentação','Habitação','Transporte','Educação','Lazer','Viagem'];
  }

  /**
   * iniciar os campos do formulario
   */
  private iniciarFormulario(): void {
    const hoje = moment().format();
    this.formulario = this.formBuilder.group({
      tipo: ['', Validators.required],
      ehFixo: false,
      data: hoje,
      descricao: ['', Validators.required],
      valor: ['', Validators.required]
    });
  }

  /**
   * Carregar o formulario com a despesa enviada
   * @param despesa dado enviado para carregar o formulario
   */
  private carregarFormulario(despesa: IDespesa): void {
    if (despesa) {
      const valor = new Intl.NumberFormat('pt-BR', {minimumFractionDigits: 2}).format(despesa.valor);
      this.formulario.patchValue({
        tipo: despesa.tipo,
        descricao: despesa.descricao,
        ehFixo: despesa.ehFixo,
        data: despesa.data,
        valor: valor
      });
    }
  }

  /**
   * verificar se a chamada está no modo de ediçao e carregar o formulario com os dados da despesa
   */
  private verificarModoEdicao(): void {
    if (this.lancamentosService.modoEdicao) {
      const despesa = this.lancamentosService.despesaSelecionada;
      this.carregarFormulario(despesa);
    }
  }

  /**
   * Criar uma despesa
   * @param despesa objeto para ser criado
   */
  private salvar(despesa: IDespesa): void {
    this.lancamentosService.criarDespesa(despesa).subscribe({
      next: (resp) => {
        const despesaStored = resp.body;
        Swal.fire(
          'SUCESSO: Criar Despesa',
          `Despesa criada com sucesso. Código: '${despesaStored?.id}'`,
          'success'
          );
        // limpar os campos do formulario
        this.onLimpar();
      },
      error: (err: HttpErrorResponse) => {
        let msg = err.error.error;
        if (err.status === HttpStatusCode.BadRequest && err.error.error.includes('Bad Request')) {
          msg = 'Usuario não autenticado';
        }
        Swal.fire(
          'ALERTA: Criar Despesa',
          err.error.mensagem ? err.error.mensagem : 'Ocorreu um erro inesperado. [ ' + msg + ' ]',
          'warning'
          );
      }
    });
  }

  /**
   * Realizar atualização da despesa
   * @param despesa objeto para ser atualizado
   */
  private atualizar(despesa: IDespesa): void {
    this.lancamentosService.atualizarDespesa(despesa).subscribe({
      next: (resp) => {
        if (resp.status === HttpStatusCode.Ok){
          // limpar o formulario
          this.formulario.reset();
          // mensagem
          Swal.fire(
            'Atualizar Despesa',
            'Despesa atualizada com sucesso!',
            'success'
            );
        }
      },
      error: (err) => {
        Swal.fire(
          'ALERTA: Atualizar Despesa',
          err.error.mensagem ? err.error.mensagem : 'Ocorreu um erro inesperado. [ ' + err.error.error + ' ]',
          'warning'
          );
      }
    });
  }

  /**
   * evento do botao salvar
   */
  onSalvar(): void {
    const despesa: IDespesa = this.formulario.value;
    // formatar o valor
    despesa.valor = +(despesa.valor.toString().replace('.','').replace(',','.'));
    // formatar a data
    despesa.data = moment(despesa.data).format('YYYY-MM-DD');
    // verificar se o formulário esta em modo de edição
    if (this.lancamentosService.modoEdicao) {
      despesa.id = this.lancamentosService.despesaSelecionada.id;
      this.atualizar(despesa);
    } else {
      this.salvar(despesa);
    }
  }

  /**
   * evento do botao limpar
   */
  onLimpar(): void {
    this.formulario.reset();
    this.formulario.patchValue({
      data: moment().format(),
      ehFixo: false
    });
  }
}
