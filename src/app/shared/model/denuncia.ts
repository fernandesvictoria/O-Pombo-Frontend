import { Pruu } from "./pruu";
import { Usuario } from "./usuario";

export class Denuncia {
  id!: number;
  dataCriacao!: Date;
  pruu!: Pruu;
  user!: Usuario;
  motivo!: string;
  analisada!: boolean;
}
