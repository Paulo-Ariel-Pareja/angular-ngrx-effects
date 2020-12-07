import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { UsuarioService } from '../../services/usuario.service';
import * as usuariosActions from '../actions';

@Injectable()
export class UsuariosEffects {
  constructor(
    private actions$: Actions,
    private service: UsuarioService
  ) {}

  cargarUsuarios$ = createEffect(() => this.actions$.pipe(
    ofType(usuariosActions.CARGAR_USUARIOS),
    mergeMap(() => this.service.getUsers()
      .pipe(
        map(users => new usuariosActions.CargarUsuariosSuccess(users)),
        catchError( error => of(new usuariosActions.CargarUsuariosFail(error))  )
      ))
    )
  );


}
