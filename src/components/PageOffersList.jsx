import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { loadOffers } from '../redux/actions'
import Offer from './Offer'

class PageOffersList extends React.Component {

  constructor(props) {
    super(props);

  }

  componentDidMount() {
    if(!this.props.offLoaded)
    {
      this.props.loadOffers();
    }
  }
  
  render() {
    const { loading,offers } = this.props;

    
    if(loading) {
      return <p>Loading ...</p>
    }
    
    return (
      <div>
        <h1>Offers List:</h1>
          {offers && offers.map((offer => <Offer key={offer.id} offer={offer} />))}
        <Link to="/new">
          <button>Create Offer</button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    offers: state.offers,
    offLoaded: state.offLoaded,
    loading: state.loading
  }
}

const mapDispatchToProps = (dispatch) => ({
 loadOffers: ()=> dispatch(loadOffers())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageOffersList)