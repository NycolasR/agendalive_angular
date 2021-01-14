import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Componentes importados
import { HomeComponent } from './views/home/home.component';

const routes: Routes = [
  { // Cada roteamento possui um path e um component
    path: "", // Caminho raiz -> default
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
