import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { offerDelete } from '../redux/actions';
import photo from '../IMG/photo.jpg'
import Button from 'react-bootstrap/Button';

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
            <div  style={{ clear: 'left', marginBottom:'2px'}} >
                <div style={{border:'outset grey', padding:'0.5px', position:'relative',height:'110px', width:'944px', textAlign:'justify'}} onClick={()=> {this.detailsVisible()}}>
                    <div style={{width:'15%', float:'left', height:"100%"}}>
                        <img src={photo} onClick={() => {this.props.openPopupbox(photo),this.detailsVisible(2)}} style={{width:'100%', height:"100%"}} />
                    </div>
                    <div style={{width:'80%', float:'left'}}>                        
                        <p style={{textAlign: "center"}}><strong>Title :</strong> {this.props.offer.title}</p>
                        <p style={{marginLeft: "10px"}}>><strong>Guest :</strong> {this.props.offer.beds}</p>
                        <p style={{marginLeft: "10px"}}>><strong>Date :</strong> {this.props.offer.endDateTime}</p>                        
                    </div>
                    <div style={{position:'absolute', right:'3%'}}>
                        <p style={{marginTop: "15px"}}><strong>Price per day :</strong>
                            <br />
                            <p style={{textAlign: "center"}}>{this.props.offer.price}</p> 
                        </p>
                        
                    </div> 
                    <Button variant="outline-danger" size="sm" style={{position:'absolute', right:'10px', bottom:'5px'}} onClick={() => {this.deleteOffer(this.props.offer.id)}}> Delete </Button>
                </div>
                {this.state.details ?
                    <div style={{borderStyle:'none outset outset outset',borderColor: 'grey', padding:'0.5px', position:'relative', position: 'relative', width:'944px', textAlign:'justify'}}>
                        <div>
                            <p style={{marginLeft: "10px"}}>><strong>Country :</strong> {this.props.offer.country} </p>
                            <p style={{marginLeft: "10px"}}>><strong>City : </strong> {this.props.offer.city} </p>
                            <p style={{marginLeft: "10px"}}>><strong>Address : </strong> {this.props.offer.address} </p>
                            <p style={{marginLeft: "10px"}}>><strong>Room Number : </strong> {this.props.offer.roomNumber} </p>  
                        </div>
                        <div style={{position: 'absolute', right: '5%', top: '0px'}}> 
                            <p><strong>Start Date : </strong> {this.props.offer.startDateTime} </p>
                            <p><strong>End Date : </strong> {this.props.offer.endDateTime} </p>
                            <p style={{textAlign: 'right', marginRight:'80px'}}><strong>Rating :</strong> 
                                <br />
                                <p style={{textAlign: "right", marginRight:'25px'}}>{this.props.offer.price}</p> 
                            </p>
                        </div>
                        <div style={{textAlign: "center", padding: '2px'}}>
                            <p><strong>Description : </strong></p>
                            <span> {this.props.offer.description}{this.props.offer.description}{this.props.offer.description}{this.props.offer.description}{this.props.offer.description}{this.props.offer.description}{this.props.offer.description}{this.props.offer.description}{this.props.offer.description} </span>
                        </div>
                    </div>
                    :
                    null
                }
            </div>            
       )        
    }
}

const mapStateToProps = () => {
    return {     
    };
  };
  
  const mapDispatchToProps = dispatch => ({
    offerDelete: id => dispatch(offerDelete(id)),
  });
export default connect(mapStateToProps, mapDispatchToProps) (withRouter(Offer));
