
export interface ILancamento {
  data: string,
  descricao: string,
  ehFixo: boolean,
  ehReceita: boolean,
  id?: number,
  mensagem?: string,
  tipo: string,
  valor: number
}
