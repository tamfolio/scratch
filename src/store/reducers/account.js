import def from '../../services/enum';
const initialState = {
  loading: def.FALSE,
  data: [],
  error: false,
  errorType: '',
  errorMessage: ''
};

const accountData = (state = initialState, action) => {
  switch (action.type) {
    case def.FETCH_ACCOUNT_DATA_REQUEST:
      return {
        ...state,
        loading: def.TRUE
      };
    case def.FETCH_ACCOUNT_DATA_SUCCESS:
      return {
        error: false,
        errorMessage: '',
        errorType: '',
        data: action.payload,
        loading: def.DONE
      };
    case def.FETCH_ACCOUNT_DATA_FAILURE:
      return {
        ...state,
        loading: def.DONE,
        errorType: action.payload?.errorType,
        error: true,
        errorMessage: action.payload?.errorMessage
      };
    case def.RESET_ACCOUNT_DATA:
      return {
        loading: def.DONE,
        error: false,
        errorType: '',
        data: [],
        errorMessage: action.payload
      };
    default:
      return state;
  }
};

export default accountData;