import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../shared/service/login.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
})
export class MenuComponent implements OnInit {
  usuarioAdmin: boolean = false;

  constructor(
    private service: LoginService,
    private router: Router,
  ) { }

  ngOnInit(): void { }

  public estaAutenticado(): boolean {
    return this.service.estaAutenticado();
  }

  public sair() {
    this.service.sair();
    this.router.navigate(['/login']);
  }

  public isAdmin(): boolean {
    this.usuarioAdmin = this.service.isAdmin();
    return this.usuarioAdmin;
  }
}