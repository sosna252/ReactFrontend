import React from 'react'
import Button from 'react-bootstrap/Button';

class Offer extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            details: false,
        }
        this.detailsVisible = this.detailsVisible.bind(this);
    }
    detailsVisible = () => {
        this.setState({details: !this.state.details})
    }
    
    render(){
       return(
            <div  style={{ clear: 'left', marginBottom:'2px'}} >
                <div className="off" style={{border:'outset grey', padding:'0.5px', position:'relative',height:'110px', width:'944px', textAlign:'justify'}} onClick={()=> {this.detailsVisible()}}>
                    <div style={{width:'15%', float:'left', height:"100%"}}>
                        <img src={'http://flatlybackend-env.apt77knte5.us-east-1.elasticbeanstalk.com/itemphoto/'+ this.props.offer.id} onClick={() => {this.props.openPopupbox(this.props.offer.id)}} style={{width:'100%', height:"100%", borderRadius: '5px 0px 0px 5px'}} />
                    </div>
                    <div style={{width:'80%', float:'left'}}>                        
                        <p style={{textAlign: "center"}}><strong>Title :</strong> {this.props.offer.title}</p>
                        <p style={{marginLeft: "10px"}}>><strong>Guest :</strong> {this.props.offer.beds}</p>
                        <p style={{marginLeft: "10px"}}>><strong>Date :</strong> {this.props.offer.end_date_time}</p>                        
                    </div>
                    <div style={{position:'absolute', right:'3%'}}>
                        <p style={{marginTop: "15px"}}><strong>Price per day :</strong>
                            <br />
                            <p style={{textAlign: "center"}}>{this.props.offer.price}</p> 
                        </p>
                        
                    </div> 
                    <Button className="rounded-pill shadow" variant="outline-danger" size="sm" style={{position:'absolute', right:'10px', bottom:'5px'}} onClick={(e) => {this.props.deleteOffer(e,this.props.offer.id)}}> Delete </Button>
                    <Button className="rounded-pill shadow" variant="outline-primary" size="sm" style={{position:'absolute', right:'80px', bottom:'5px'}} onClick={() => {this.props.editOffer(this.props.offer)}}> Edit </Button>
                </div>
                {this.state.details ?
                    <div className="off" style={{borderStyle:'none outset outset outset',borderColor: 'grey', padding:'0.5px', position:'relative', position: 'relative', width:'944px', textAlign:'justify'}}>
                        <div>
                            <p style={{marginLeft: "10px"}}>><strong>Country :</strong> {this.props.offer.country} </p>
                            <p style={{marginLeft: "10px"}}>><strong>City : </strong> {this.props.offer.city} </p>
                            <p style={{marginLeft: "10px"}}>><strong>Address : </strong> {this.props.offer.address} </p>
                            <p style={{marginLeft: "10px"}}>><strong>Room Number : </strong> {this.props.offer.room_number} </p>  
                        </div>
                        <div style={{position: 'absolute', right: '5%', top: '8px'}}> 
                            <p><strong>Start Date : </strong> {this.props.offer.start_date_time} </p>
                            <p><strong>End Date : </strong> {this.props.offer.end_date_time} </p>
                            <p style={{textAlign: 'right', marginRight:'80px'}}><strong>Rating :</strong> 
                                <br />
                                <p style={{textAlign: "right", marginRight:'25px'}}>{this.props.offer.price}</p> 
                            </p>
                        </div>
                        <div style={{textAlign: "center", padding: '2px'}}>
                            <p><strong>Description : </strong></p>
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
export default Offer;
