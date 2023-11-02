import { OperacaoTypeEnum } from "./shared/enums/operacao-type.enum";
import { IDespesa } from "./shared/models/despesa.interface";
import { IReceita } from "./shared/models/receita.interface";

export class AppState {
 
  token: string = '';
  operacao = OperacaoTypeEnum.SALVAR;

  // lancamentos selecionados
  despesaSelecionada!: IDespesa;
  receitaSelecionada!: IReceita;  
}