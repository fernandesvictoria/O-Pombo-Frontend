import { Denuncia } from "./denuncia";
import { Usuario } from "./usuario";

export class Pruu {
  uuid!: string;
  texto!: string;
  dataCriacao!: Date;
  quantidadeLikes!: number;
  usuario!: Usuario;
  likes!: Usuario[];
  bloqueado!: boolean;
  denuncias!: Denuncia[];
}
