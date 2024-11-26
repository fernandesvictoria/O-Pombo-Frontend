import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../shared/service/login.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
})
export class MenuComponent implements OnInit {
  constructor(
    private service: LoginService,
    private router: Router,
  ) { }

  ngOnInit(): void { }

  public sair() {
    this.service.sair();
    this.router.navigate(['/login']);
  }

}



