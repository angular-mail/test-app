import {createSelector, createFeatureSelector, ActionReducerMap} from '@ngrx/store';
import * as fromRoot from '@app/reducers';
import * as fromAuth from '@app/auth/reducers/auth.reducer';
import * as fromLoginPage from '@app/auth/reducers/login-page.reducer';
import {AuthApiActions} from '@app/auth/actions';

export interface AuthState {
    status: fromAuth.State;
    loginPage: fromLoginPage.State;
}

export interface State extends fromRoot.State {
    auth: AuthState;
}

export const reducers: ActionReducerMap<AuthState, AuthApiActions.AuthActions> = {
    status: fromAuth.reducer,
    loginPage: fromLoginPage.reducer
};

export const selectAuthState = createFeatureSelector<State, AuthState>('auth');

export const selectAuthStatusState = createSelector(
    selectAuthState,
    (state: AuthState) => state.status
);
export const getUser = createSelector(
    selectAuthStatusState,
    fromAuth.getUser
);
export const getLoggedIn = createSelector(
    getUser,
    user => !!user
);

export const selectLoginPageState = createSelector(
    selectAuthState,
    (state: AuthState) => state.loginPage
);
export const getLoginPageError = createSelector(
    selectLoginPageState,
    fromLoginPage.getError
);
export const getLoginPagePending = createSelector(
    selectLoginPageState,
    fromLoginPage.getPending
);