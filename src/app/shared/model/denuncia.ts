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
