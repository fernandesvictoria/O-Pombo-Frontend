import { Denuncia } from "./denuncia";
import { Usuario } from "./usuario";

export class Pruu {
  id!: string;
  usuario!: Usuario;
  texto!: string;
  usuariosQueCurtiram!: Usuario[];
  denuncias!: Denuncia[];
  imagem!: string; // URL da imagem
  quantidadeCurtidas!: number;
  quantidadeDenuncias!: number;
  bloqueado!: boolean;
  criadoEm!: Date;
  curtido!: boolean;
}
