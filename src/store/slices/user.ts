import { AuthorizationStatusType, RequestStatus } from '../../constants';
import { AuthenticatedUserType } from '../../types';
import { AuthorizationStatus } from '../../constants';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { checkAuth, login, logout } from '../thunk/auth';

type UserStateType = {
  user: AuthenticatedUserType | null;
  authorizationStatus: AuthorizationStatusType;
  requestStatus: RequestStatus;
};

const initialState: UserStateType = {
  user: null,
  authorizationStatus: AuthorizationStatus.NoAuth,
  requestStatus : RequestStatus.Idle,
};

function processSuccess(state: UserStateType, action: PayloadAction<AuthenticatedUserType>) {
  state.user = action.payload;
  state.requestStatus = RequestStatus.Success;
  state.authorizationStatus = AuthorizationStatus.Auth;
}
function processLoading(state: UserStateType) {
  state.requestStatus = RequestStatus.Loading;
}
function processFailed(state: UserStateType) {
  state.requestStatus = RequestStatus.Failed;
  state.authorizationStatus = AuthorizationStatus.NoAuth;
}


const userSlice = createSlice({
  initialState,
  name: 'user',
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(checkAuth.fulfilled, processSuccess);
    builder.addCase(checkAuth.rejected, processFailed);
    builder.addCase(checkAuth.pending, processLoading);
    builder.addCase(login.fulfilled,processSuccess);
    builder.addCase(login.rejected,processFailed);
    builder.addCase(login.pending,processLoading);
    builder.addCase(logout.fulfilled, (state) => {
      state.user = null;
      state.authorizationStatus = AuthorizationStatus.NoAuth;
    });
  },
});

const userSelectors = {
  authorizationStatus: (state: { user: UserStateType }) => state.user.authorizationStatus,
  requestStatus: (state: { user: UserStateType }) => state.user.requestStatus,
  user: (state: { user: UserStateType }) => state.user.user,
};

const { actions: userActions } = userSlice;

export {
  userSlice,
  userActions,
  userSelectors,
};

export type {
  UserStateType,
};
