import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadOffers, filtrOffers, sortOffers } from '../redux/actions';
import Offer from './Offer';
import OfferEdit from './OfferEdit';
import PageLogOut from './PageLogOut';
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
      filtrText: "-",
      sortText: "date",
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
    this.SortHandle = this.SortHandle.bind(this);
  }

  componentDidMount() {
    console.log(this.props.login)
    if(this.props.login)
    {
      console.log(this.props.user);
      this.props.loadOffers(this.props.user);
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
    if(this.state.sorted)
    {
      this.props.sortOffers(this.state.sortText, !this.state.desc);
    }
  }
  SortHandle(text){
    console.log(text)
    this.setState({sortText: text, sorted: true})
    this.props.sortOffers(text, this.state.desc);
  }

  changeVisibility(){
    this.setState({filtrVisible: !this.state.filtrVisible})
  }

  handleFiltred(city,people,From,To){
    console.log(city)
    this.props.filtrOffers(city,people,From,To);
    this.changeVisibility();
  }
  openPopupbox = (photo) => {
    const content = <img  src={`http://flatlybackend-env.apt77knte5.us-east-1.elasticbeanstalk.com/itemphoto/${photo}`} style={{width:'90%', heigh:'90%'}}/>
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
    const { loading,offers,login, user } = this.props;
    return (
      <div align="center">
        {!login ? <PageLogOut />
        :
          <div className="bg" style={{width: '1004px',}}>
            
            <div className="" align="center" style={{width: '944px', position: 'relative', textAlign: 'justify'}}>
              {this.state.filtrVisible ? 
                <div align="center" style={{width: '944px', top: '1px', zIndex:'1'}}>
                  <OfferFiltr changeVisibility={this.changeVisibility} handleFiltred={this.handleFiltred}/>
                </div>
              : 
                <div style={{position: 'absolute', left: '50%', zIndex:"1"}}><Button variant="outline-info" size="sm" className="rounded-pill" onClick={this.changeVisibility}><i className="fa fa-search"></i> Filtr</Button></div>}
              
              <div style={{float: 'left', width: '30%'}}>
                <h1 >Offers List :</h1>
              </div>
              <div style={{ float: 'left', position: 'relative', width: '70%', height: '80px', top:"5%"}}>
                <div align="right" style={{ clear:"left",right:'3px', position:'absolute', bottom:'5px',width:'40%'}}>
                <nav style={{margin: "5px"}}>
                  <label style={{margin: "5px"}}>Sortuj : </label>
                  <label className="btn btn-light btn-sm"  onClick={()=>this.SortHandle("price")} style={{borderRadius: "5px 0px 0px 5px"}}>Price</label> 
                  <label className="btn btn-light btn-sm" onClick={()=>this.SortHandle("date")} style={{borderRadius: "0px"}}>Date</label> 
                  <label className="btn btn-light btn-sm" onClick={()=>this.SortHandle("rating")} style={{borderRadius: "0px 5px 5px 0px"}}>Rating</label>
                  <label className="btn" onClick={this.descChange}>{this.state.desc? <i className="fa fa-arrow-down" />: <i className="fa fa-arrow-up"/>} </label>
                  </nav>
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
          }        
        </div>
    );
  }
}

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    offers: state.offers,
    loading: state.loading,
    login: state.login,
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => ({
 loadOffers: (user)=> dispatch(loadOffers(user)),
 offerDelete: id => dispatch(offerDelete(id)),
 filtrOffers: (city,people,From,To)=>dispatch(filtrOffers(city,people,From,To)),
 sortOffers: (sort,desc) => dispatch(sortOffers(sort,desc)),

})

export default connect(
  mapStateToProps,
  mapDispatchToProps
) (withRouter(PageOffersList));