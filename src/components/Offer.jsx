import React from 'react'
class Offer extends React.Component {
    constructor(props) {
        super(props);
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
                </div>
                <br/>
            </div>
            
       )        
    }
}
export default Offer
