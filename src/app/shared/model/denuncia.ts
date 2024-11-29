import { Motivo } from "./enum/motivo";
import { StatusDenuncia } from "./enum/status-denuncia";
import { Pruu } from "./pruu";
import { Usuario } from "./usuario";

export class Denuncia {
  id!: number;
  pruu!: Pruu;
  usuario!: Usuario;
  motivo!: Motivo;
  status: StatusDenuncia = StatusDenuncia.PENDENTE;
}

export class DenunciaDados {
  id!: string;
  nomeDenunciante!: string;
  pruuId!: string;
  textoPruu!: string;
  imagemPruu!: string;
  usuarioId!: string;
  nomeUsuario!: string;
  motivo!: string;
  status!: string;
  criadoEm!: string;
}
