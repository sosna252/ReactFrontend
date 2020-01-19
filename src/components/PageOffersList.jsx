import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { loadOffers } from '../redux/actions'
import Offer from './Offer'
import OfferFiltr from './OfferFiltr'

class PageOffersList extends React.Component {

  constructor(props) {
    super(props);
    this.state ={
      filtr: false
    }
    this.changeVisibility = this.changeVisibility.bind(this);
  }

  componentDidMount() {
    if(!this.props.offLoaded)
    {
      this.props.loadOffers();
    }
  }
  changeVisibility(){
    this.setState({filtr: !this.state.filtr})
  }
  render() {
    const { loading,offers } = this.props;

    
    if(loading) {
      return <p>Loading ...</p>
    }
    
    return (
      <div>
        {this.state.filtr ? <div><OfferFiltr changeVisibility={this.changeVisibility}/></div> : <button onClick={this.changeVisibility}>Filtr</button>}
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