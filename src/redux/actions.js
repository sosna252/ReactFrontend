import { OFFERS_LOADED, OFFER_ADD,OFFERS_LOADING,OFFERS_ERROR,OFFER_DELETE,OFFER_EDIT, USER_LOGGING} from './constants';

export const offersLoaded = (offers) => {
  return {
    type: OFFERS_LOADED,
    payload: {
      offers
    }
  };
}
export const offerAdd = (newoffer)=>{
  return{
    type: OFFER_ADD,
    payload:{
      newoffer
    }
  }
}
export const offerEfit = (offer)=>{
  return{
    type: OFFER_EDIT,
    payload:{
      offer
    }
  }
}
export const offerDelete = (id)=>{
  return{
    type: OFFER_DELETE,
    payload:{
      id
    }
  }
}
export const offersLoadingError=(error)=>{
  return{
    type: OFFERS_ERROR,
    payload:{
      error
    }
  }
}

export const offersLoadingOffers=()=>{
  return{
    type: OFFERS_LOADING
  }
}
export const UserLogging=(user)=>{
  return{
    type: USER_LOGGING,
    payload: user
  }
}
  
    

export const loadOffers=()=>{
  return(dispatch)=>{
    dispatch(offersLoadingOffers())
    fetch('http://localhost:3004/offers')
    .then((data) => data.json())
    .then(
    (offers) => dispatch(offersLoaded(offers)),
    (error)=>dispatch(offersLoadingError(error))
    );
  };
}
export const sortOffers=()=>{
  return(dispatch)=>{
    dispatch(offersLoadingOffers())
    fetch('http://localhost:3004/offers')
    .then((data) => data.json())
    .then(
    (offers) => dispatch(offersSorted(offers)),
    (error)=>dispatch(offersLoadingError(error))
    );
  };
}
export const filtrOffers=()=>{
  return(dispatch)=>{
    dispatch(offersLoadingOffers())
    fetch('http://localhost:3004/offers')
    .then((data) => data.json())
    .then(
    (offers) => dispatch(offersFiltred(offers)),
    (error)=>dispatch(offersLoadingError(error))
    );
  };
}
