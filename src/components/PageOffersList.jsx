import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { loadOffers } from '../redux/actions'
import Offer from './Offer'
import OfferFiltr from './OfferFiltr'
import {
  PopupboxManager,
  PopupboxContainer
} from 'react-popupbox';
import "react-popupbox/dist/react-popupbox.css"

class PageOffersList extends React.Component {

  constructor(props) {
    super(props);
    this.state ={
      filtr: false
    }
    this.changeVisibility = this.changeVisibility.bind(this);
    this.openPopupbox = this.openPopupbox.bind(this);
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

  openPopupbox = (photo) => {
    const content = <img src={photo} style={{width:'100%', heigh:'100%'}}/>
    PopupboxManager.open({
      content,
      config: {
        titleBar: {
          enable: true,
          text: 'Photo!'
        },
        fadeIn: true,
        fadeInSpeed: 500
      }
    })
  }

  render() {
    const { loading,offers } = this.props;

    
    if(loading) {
      return <p>Loading ...</p>
    }
    
    return (
      <div >
        {this.state.filtr ? <div><OfferFiltr changeVisibility={this.changeVisibility}/></div> : <div><button onClick={this.changeVisibility}>Filtr</button></div>}
        <div style={{float: 'left', width: '20%'}}>
          <h1 >Offers List:</h1>
        </div>
        <div style={{ float: 'left', position: 'relative', width: '80%', height: '80px'}}>
          <div style={{ position:'absolute', right: '2px', bottom:'5px' }}>
            <select>
              <option>Price high</option>
              <option>Price low</option>
              <option>Date low</option>
              <option>Date high</option>
              <option>Price high</option>
              <option>Price low</option>
              <option>Date low</option>
              <option>Date high</option>
            </select>
            &nbsp;
            <button>Sort</button>
          </div>          
        </div>
        <div style={{clear:'left'}}>
          {offers && offers.map((offer => <Offer key={offer.id} offer={offer} openPopupbox={this.openPopupbox} />))}
          <Link to="/new">
            <button>Create Offer</button>
          </Link>
          <div>
          <PopupboxContainer />
          </div>
        </div>
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