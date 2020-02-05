import { OFFERS_LOADED, OFFER_ADD,OFFERS_LOADING,OFFERS_ERROR,OFFER_DELETE,OFFER_EDIT, USER_LOGGING, USER_LOGOUT} from './constants';

export const offersLoaded = (offers) => {
  return {
    type: OFFERS_LOADED,
    payload: {
      offers
    }
  };
}
export const offersFiltred = (offers) => {
  return {
    type: OFFERS_LOADED,
    payload: {
      offers
    }
  };
}
export const offersSorted = (offers) => {
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
export const offerEdit = (offer)=>{
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
export const UserLogOut=()=>{
  return{
    type: USER_LOGOUT,
    payload:{

    }
  }
}
  
    

export const loadOffers=(token)=>{
  return(dispatch)=>{
    dispatch(offersLoadingOffers())
    fetch('http://flatlybackend-env.apt77knte5.us-east-1.elasticbeanstalk.com/items', {
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'securityTokenValue': token
      }
    })
    .then((data) => data.json())
    .then(
    (offers) => dispatch(offersLoaded(offers)),
    (error)=>dispatch(offersLoadingError(error))
    );
  };
}
export const sortOffers=(sort,desc, token)=>{
  return(dispatch)=>{
    dispatch(offersLoadingOffers())
    var tmp = 'http://flatlybackend-env.apt77knte5.us-east-1.elasticbeanstalk.com/items?sort='+sort;
    if(desc)
    {
      tmp= tmp + '&dir=desc';
    }
    fetch(tmp, {
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'securityTokenValue': token
      }
    })
    .then((data) => data.json())
    .then(
    (offers) => dispatch(offersSorted(offers)),
    (error)=>dispatch(offersLoadingError(error))
    );
  };
}
export const filtrOffers=(city,people,From,To,token)=>{
  return(dispatch)=>{
    dispatch(offersLoadingOffers())
    var Tmp="";    
    
    if(city!==null)
    {
       Tmp = `http://flatlybackend-env.apt77knte5.us-east-1.elasticbeanstalk.com/items?city=${city}&people=${people}`;
    }
    else
    {
      Tmp = `http://flatlybackend-env.apt77knte5.us-east-1.elasticbeanstalk.com/items?people=${people}`
    }
    if(From!==null)
    {
      Tmp = Tmp + `&dateFrom=${From}`;
    }
    if(To!==null)
    {
      Tmp = Tmp + `&dateTo=${To}`;
    }
    console.log(Tmp);
    fetch(Tmp, {
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'securityTokenValue': token
      }
    })
    .then((data) => data.json())
    .then(
    (offers) => dispatch(offersFiltred(offers)),
    (error)=>dispatch(offersLoadingError(error))
    );
  };
}
