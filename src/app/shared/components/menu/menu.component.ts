import { Component } from '@angular/core';
import { Router } from '@angular/router';
// services
import { MenuService } from '../../services/menu.service';
// enums
import { MenuTypeEnum } from '../../enums/menu-type.enum';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  constructor(
    private menuService: MenuService,
    private router: Router,
  ) { }

  get estouDashboard(): boolean {
    return this.menuService.ondeEstou === MenuTypeEnum.DASHBOARD;
  }

  get estouRelatorioDespesa(): boolean {
    return this.menuService.ondeEstou === MenuTypeEnum.RELATORIO_DESPESA;
  }

  get estouRelatorioReceita(): boolean {
    return this.menuService.ondeEstou === MenuTypeEnum.RELATORIO_RECEITA;
  }

  get estouLancamentoDespesa(): boolean {
    return this.menuService.ondeEstou === MenuTypeEnum.LANCAMENTO_DESPESA;
  }

  get estouLancamentoReceita(): boolean {
    return this.menuService.ondeEstou === MenuTypeEnum.LANCAMENTO_RECEITA;
  }

  get estouCadastro(): boolean {
    return this.menuService.ondeEstou === MenuTypeEnum.CADASTRO;
  }

  onNavigate(rota: string): void {
    this.router.navigate([rota]);
  }
}
