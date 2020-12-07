import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { UsuarioService } from '../../services/usuario.service';
import * as usuariosActions from '../actions';

@Injectable()
export class UsuarioEffects {
  constructor(
    private actions$: Actions,
    private service: UsuarioService
  ) {}

  cargarUsuario$ = createEffect(() => this.actions$.pipe(
    ofType(usuariosActions.CARGAR_USUARIO),
    mergeMap(accion => this.service.getUserById(accion['id'])
      .pipe(
        map(user => new usuariosActions.CargarUsuarioSuccess(user)),
        catchError( error => of(new usuariosActions.CargarUsuarioFail(error))  )
      ))
    )
  );


}
