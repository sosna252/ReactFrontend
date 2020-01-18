import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { offerDelete } from '../redux/actions';
class Offer extends React.Component {
    constructor(props) {
        super(props);
        this.deleteOffer = this.deleteOffer.bind(this);
    }
    deleteOffer = (id) => {        
        fetch('http://localhost:3004/offers/'+id, {
        method: 'DELETE'
        }).then( ()=> {
            
              this.props.offerDelete(id);
              this.props.history.push("/new");
          })  
    }
    render(){
       return(
            <div>
                <div style={{border:'2px dotted Green', padding:'3px', position:'relative',height:'110px'}}>
                    <div style={{border:'1px solid Black', padding:'1px', width:'30%', float:'left',height:"100px"}}>Photo</div>
                    <div style={{width:'50%', float:'left'}}>
                        <p>Title: {this.props.offer.address} room {this.props.offer.roomNumber}</p>
                        <p>Guests: {this.props.offer.beds}</p>
                        <p>Date: {this.props.offer.endDateTime}</p>
                    </div>
                    <div style={{position:'absolute', right:'3%'}}>
                        <p>Price per day: </p>
                        <p style={{marginLeft:'45%'}}>{this.props.offer.price} </p>
                    </div> 
                    <button style={{position:'absolute', right:'10px', bottom:'5px'}} onClick={() => {this.deleteOffer(this.props.offer.id)}}> Delete </button>
                </div>
                <br/>
            </div>
            
       )        
    }
}

const mapStateToProps = (state) => {
    return {     
    };
  };
  
  const mapDispatchToProps = dispatch => ({
    offerDelete: id => dispatch(offerDelete(id))
  });
export default connect(mapStateToProps, mapDispatchToProps) (withRouter(Offer));
