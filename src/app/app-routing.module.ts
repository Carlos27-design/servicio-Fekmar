import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  {
    path: 'inicio',
    loadChildren: () =>
      import('./modules/inicio/inicio.module').then((m) => m.InicioModule),
  },
  {
    path: 'servicio',
    loadChildren: () =>
      import('./modules/service/service.module').then((m) => m.ServiceModule),
  },
  {
    path: 'contacto',
    loadChildren: () =>
      import('./modules/contacto/contacto.module').then(
        (m) => m.ContactoModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
