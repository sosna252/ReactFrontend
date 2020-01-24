import { OFFERS_LOADED,OFFER_ADD,OFFERS_LOADING,OFFERS_ERROR, OFFER_DELETE } from './constants';

export const initialState = {
  offers: [],
  offLoaded: false,
  error: null,
  loading:false
};

// Read this: https://redux.js.org/basics/reducers

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case OFFERS_LOADED: {
      const { offers } = action.payload;
      // CAREFUL: You can't modify state variable directly.
      return Object.assign({}, state, { offers,offLoaded: true,error: false,loading:false });
    }
    case OFFERS_LOADING:{
      return Object.assign({},state,{loading:true,error:null});
    }
    case OFFERS_ERROR:{
      const {error}=action.payload;
      return Object.assign({},state,{loading:true,error});
    }
    case OFFER_ADD:{
      const {newoffer}=action.payload;
      const newoffers=[...state.offers, newoffer]
      return Object.assign({},state,{offers: newoffers});     
    }
    case OFFER_DELETE:{
      return state;     
    }
    default:
        return state
  }
}

export default appReducer;