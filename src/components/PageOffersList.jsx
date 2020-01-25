import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadOffers } from '../redux/actions';
import Offer from './Offer';
import OfferFiltr from './OfferFiltr';
import {
  PopupboxManager,
  PopupboxContainer
} from 'react-popupbox';
import "react-popupbox/dist/react-popupbox.css";
import Button from 'react-bootstrap/Button';

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
  
  detailsVisible = () => {
    console.log('hey');
    this.setState=({details: !this.state.details})
}

  render() {
    const { loading,offers } = this.props;
    return (
      <div align="center">
        <div className="bg" style={{width: '1004px',}}>
          <div align="left" style={{width: '944px', position: 'relative', textAlign: 'justify'}}>
            {this.state.filtr ? 
              <div style={{position: 'absolute', left: '40%', top: '10px', zIndex:'1'}}>
                <OfferFiltr changeVisibility={this.changeVisibility}/>
              </div>
             : 
              <div style={{position: 'absolute', left: '50%'}}><Button variant="outline-info" size="sm" onClick={this.changeVisibility}>Filtr</Button></div>}
            {this.state.filtr ? <div><br /><br /> </div>: <br />}
            <div style={{float: 'left', width: '30%'}}>
              <h1 >Offers List:</h1>
            </div>
            <div style={{ float: 'left', position: 'relative', width: '70%', height: '80px'}}>
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
                <Button variant="outline-dark" size="sm">Sort</Button>
              </div>          
            </div>
          </div>
          {loading ?
            <p style={{clear:'left'}}>Loading ...</p>
            :
            <div style={{clear:'left'}}>
              {offers && offers.map((offer => <Offer key={offer.id} offer={offer} openPopupbox={this.openPopupbox} detailsVisible={this.detailsVisible}/>))}
              <br />
              <Link to="/new">
                <Button variant="outline-secondary">Create Offer</Button>
              </Link>
              <div>
              <PopupboxContainer />
              </div>
            </div>          
          }          
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