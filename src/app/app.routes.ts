import { Routes } from '@angular/router';
import { ArmazemInventoryComponent } from './armazem-inventory/armazem-inventory.component';
import {HomeComponent} from './home/home.component';

export const routes: Routes = [
  {
    path: '', // Rota padrão
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'armazem-inventory', // Caminho para o componente
    component: ArmazemInventoryComponent
  },
];
