import def from "../../services/enum";
export const fetchAccountDataRequest = () => ({ type: def.FETCH_ACCOUNT_DATA_REQUEST });
export const fetchAccountDataSuccess = (accountData) => ({ type: def.FETCH_ACCOUNT_DATA_SUCCESS, payload: accountData });
export const fetchAccountDataFailure = (error) => ({ type: def.FETCH_ACCOUNT_DATA_FAILURE, payload: error });

export const resetAccount = () => async (dispatch) => {
  dispatch({ type: def.RESET_ACCOUNT_DATA });
}

export const accountAvailable = (data) => async (dispatch) => {
  dispatch(fetchAccountDataSuccess(data));
}

export const allAccountDispatch = [fetchAccountDataRequest, fetchAccountDataSuccess, fetchAccountDataFailure];