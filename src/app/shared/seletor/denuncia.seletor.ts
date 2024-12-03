import { Motivo } from "../model/enum/motivo";
import { StatusDenuncia } from "../model/enum/status-denuncia";
import { BaseSeletor } from "./base-seletor";

export class DenunciaSeletor extends BaseSeletor {
  idUsuario!: string;
  idPruu!: string;
  motivo!: Motivo;
  status!: StatusDenuncia;
  criadoEmInicio!: string;
  criadoEmFim!: string;
}
