import { Perfil } from "./enum/perfil";
import { Pruu } from "./pruu";

export class Usuario {
  uuid!: string;
  nome!: string;
  email!: string;
  senha!: string;
  cpf!: string;
  perfil!: Perfil;
  idSessao!: string;
  imagemBase64!: string;
  isAdmin!: boolean;
  pruusCriados!: Array<Pruu>;
  pruusCurtidos!: Array<Pruu>;
}