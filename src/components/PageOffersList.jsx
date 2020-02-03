import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadOffers, filtrOffers, sortOffers } from '../redux/actions';
import Offer from './Offer';
import OfferEdit from './OfferEdit'
import OfferFiltr from './OfferFiltr';
import {
  PopupboxManager,
  PopupboxContainer
} from 'react-popupbox';

import { offerDelete } from '../redux/actions';
import "react-popupbox/dist/react-popupbox.css";
import Button from 'react-bootstrap/Button';

class PageOffersList extends React.Component {

  constructor(props) {
    super(props);
    this.state ={
      filtrVisible: false,
      filtrText: "",
      sortText: "-",
      filtred: false,
      sorted: false,
      desc: false,
    }
    this.changeVisibility = this.changeVisibility.bind(this);
    this.openPopupbox = this.openPopupbox.bind(this);
    this.editOffer = this.editOffer.bind(this);
    this.cancelUpdate = this.cancelUpdate.bind(this);
    this.Update = this.Update.bind(this);
    this.handleFiltred = this.handleFiltred.bind(this);
    this.descChange = this.descChange.bind(this);
    this.sortChange= this.sortChange.bind(this);
    this.SortHandle = this.SortHandle.bind(this);
  }

  componentDidMount() {
    if(!this.props.offLoaded)
    {
      this.props.loadOffers();
    }
  }

  deleteOffer = (e,id) => {
    fetch('http://flatlybackend-env.apt77knte5.us-east-1.elasticbeanstalk.com/item/'+id, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'securityTokenValue': "9fcbf4ff-5ea9-4027-ba82-5a7a7c59c156"
    }
    })
    .then( ()=> {            
          this.props.offerDelete(id);
          this.props.loadOffers();
      })  
  }

  descChange(){
    this.setState({desc: !this.state.desc})
  }
  sortChange(e){
    this.setState({sortText: e.target.value})
  }
  SortHandle(){
    if(this.state.sortText==='-')
    {
      this.props.loadOffers();
    }
    console.log(this.state.desc)
    this.props.sortOffers(this.state.sortText, this.state.desc);

  }

  changeVisibility(){
    this.setState({filtrVisible: !this.state.filtrVisible})
  }

  handleFiltred(filtr,city,people,From,To){
    if(filtr==='-')
    {
      this.props.loadOffers();
    }
    else if (filtr ==="date" & From===null & To===null)
    {
      alert("You have to choose some date")
      return;
    }
    this.props.filtrOffers(filtr,city,people,From,To);
    this.changeVisibility();
    
  }
  handleSorted(){
    this.setState({filtrVisible: !this.state.filtrVisible})
  }
  

  openPopupbox = (photo) => {
    const content = <img  src={`http://flatlybackend-env.apt77knte5.us-east-1.elasticbeanstalk.com/itemphoto/`+photo} style={{width:'90%', heigh:'90%'}}/>
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
  cancelUpdate() {
    PopupboxManager.close();
  }
  Update() {
    this.props.loadOffers();
    PopupboxManager.close();
  }

  editOffer(offer) {
    const content = (
      <OfferEdit offer={offer} cancelUpdate={this.cancelUpdate} Update={this.Update} deleteOffer={this.deleteOffer} />
    )
    PopupboxManager.open({
      content,
      config: {
        titleBar: {
          enable: true,
          text: 'Update Data'
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
          <div align="center" style={{width: '944px', position: 'relative', textAlign: 'justify'}}>
            {this.state.filtrVisible ? 
              <div style={{position: 'absolute', left: '30%', top: '10px', zIndex:'1'}}>
                <OfferFiltr changeVisibility={this.changeVisibility} handleFiltred={this.handleFiltred}/>
              </div>
             : 
              <div style={{position: 'absolute', left: '50%'}}><Button variant="outline-info" size="sm" className="rounded-circle" onClick={this.changeVisibility}>Filtr</Button></div>}
            {this.state.filtrVisible ? <div><br /><br /> </div>: <br />}
            <div style={{float: 'left', width: '30%'}}>
              <h1 >Offers List :</h1>
            </div>
            <div style={{ float: 'left', position: 'relative', width: '70%', height: '80px'}}>
              <div align="right" style={{ clear:"left",right:'3px', position:'absolute', bottom:'5px',width:'25%'}}>
                <select className="form-control form-control-sm" style={{width:"70%",float: 'left'}} onChange={this.sortChange}>
                  <option value="none"> - </option>
                  <option value="price">Price </option>
                  <option value="date">Date </option>
                  <option value="rate">Rate</option>
                </select>
                <Button className="rounded-pill" variant="outline-dark" size="sm" onClick={this.SortHandle}>Sort</Button>
                <p style={{ float:"left"}}>Desc:</p> <input type="checkbox" onChange={this.descChange}></input>
              </div>          
            </div>
          </div>
          {loading ?
            <div>
              <p style={{clear:'left'}}>Loading ...</p>
              <br />
            </div>            
            :
            <div style={{clear:'left'}}>
              {offers && offers.map((offer => 
              <Offer 
              key={offer.id}
              offer={offer} 
              openPopupbox={this.openPopupbox}
              detailsVisible={this.detailsVisible}
              deleteOffer={this.deleteOffer}
              editOffer={this.editOffer}
              />))}
              <br />
              <Link to="/new">
                <Button variant="outline-secondary" className="rounded-pill"> <i className="fa fa-plus"></i> Create Offer</Button>
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
 loadOffers: ()=> dispatch(loadOffers()),
 offerDelete: id => dispatch(offerDelete(id)),
 filtrOffers: (filtr,city,people,From,To)=>dispatch(filtrOffers(filtr,city,people,From,To)),
 sortOffers: (sort,desc) => dispatch(sortOffers(sort,desc)),

})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageOffersList)