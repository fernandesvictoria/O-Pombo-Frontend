import { BaseSeletor } from "./base-seletor";

export class DenunciaSeletor extends BaseSeletor {
  idPruu!: string;
  idUsuario!: number;
  motivo!: string;
  dataInicial!: Date;
  dataFinal!: Date;
}
