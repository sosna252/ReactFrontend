import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { offerDelete } from '../redux/actions';
import photo from '../IMG/photo.jpg'

class Offer extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            details: false,
        }
        this.deleteOffer = this.deleteOffer.bind(this);
        this.detailsVisible = this.detailsVisible.bind(this);
    }
    deleteOffer = (id) => {        
        fetch('http://localhost:3004/offers/'+id, {
        method: 'DELETE'
        }).then( ()=> {            
              this.props.offerDelete(id);
          })  
    }
    detailsVisible = () => {
        this.setState({details: !this.state.details})
    }
    
    render(){
       return(
            <div  style={{ marginBottom:'2px'}} >
                <div id="offerdiv" style={{border:'outset grey', padding:'0.5px', position:'relative',height:'110px', width:'944px', textAlign:'justify'}} onClick={()=> {this.detailsVisible()}}>
                    <div style={{width:'15%', float:'left', height:"100%"}}>
                        <img src={photo} onClick={() => {this.props.openPopupbox(photo),this.detailsVisible(2)}} style={{width:'100%', height:"100%"}} />
                    </div>
                    <div style={{width:'55%', float:'left', position:'relative'}}>
                        <div style={{left:'15px', position:'absolute'}} >
                            <p>Title: {this.props.offer.address} room {this.props.offer.roomNumber}</p>
                            <p>Guests: {this.props.offer.beds}</p>
                            <p>Date: {this.props.offer.endDateTime}</p>
                        </div>
                        
                    </div>
                    <div style={{position:'absolute', right:'3%'}}>
                        <p>Price per day: </p>
                        <p style={{marginLeft:'45%'}}>{this.props.offer.price} </p>
                    </div> 
                    <button style={{position:'absolute', right:'10px', bottom:'5px'}} onClick={() => {this.deleteOffer(this.props.offer.id)}}> Delete </button>
                </div>
                {this.state.details ?
                    <div style={{borderStyle:'none outset outset outset',borderColor: 'grey', padding:'0.5px', position:'relative', position: 'relative', width:'944px', textAlign:'justify'}}>
                        <div style={{}}>
                            <p>Country: {this.props.offer.country} </p>
                            <p>City: {this.props.offer.city} </p>
                            <p>Address: {this.props.offer.address} </p>
                            <p>Room Number: {this.props.offer.roomNumber} </p>               
                            <p style={{textAlign: 'right'}}>Rating: {this.props.offer.rating} </p>
                        </div>
                        <div style={{position: 'absolute', right: '2%', top: '0px'}}> 
                            <p>Start Date: {this.props.offer.startDateTime} </p>
                            <p>End Date: {this.props.offer.endDateTime} </p>
                        </div>
                        <div style={{textAlign: "center"}}>
                            <p>Description:</p>
                            <span> {this.props.offer.description} </span>
                        </div>
                    </div>
                    :
                    null
                }
            </div>            
       )        
    }
}

const mapStateToProps = (state) => {
    return {     
    };
  };
  
  const mapDispatchToProps = dispatch => ({
    offerDelete: id => dispatch(offerDelete(id)),
  });
export default connect(mapStateToProps, mapDispatchToProps) (withRouter(Offer));
