import { Denuncia } from './denuncia';
import { Perfil } from './enum/perfil';
import { Pruu } from './pruu';

export class Usuario {
  id!: string;
  nome!: string;
  email!: string;
  cpf!: string;
  senha!: string;
  fotoDePerfil!: string;
  perfil!: Perfil;
  idSessao!: string;
  isAdmin!: boolean;
  pruusCriados!: Array<Pruu>;
  denunciasCriadas!: Array<Denuncia>;
}
