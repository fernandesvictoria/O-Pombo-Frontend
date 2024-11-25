import { BaseSeletor } from "./base-seletor";

export class UsuarioSeletor extends BaseSeletor {
  nome!: string;
  email!: string;
  criadoEmInicio!: Date;
  criadoEmFim!: Date;
}
