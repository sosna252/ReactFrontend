import React from 'react'
import Button from 'react-bootstrap/Button';

class OfferFiltr extends React.Component {

  constructor(props) {
    super(props);
    this.state ={
        filtr: "Price",
        text:""
    }
  }
  filtrChanged=(e) =>{
      this.setState({filtr: e.target.value})
  }
  textChange = (e) => {
    this.setState({text: e.target.value})
  }
  
  
  render() {
    const {
        filtr,
        text
      } = this.state;
    return (
      <div align="center" style={{ width:'250px'}}>
        <input className="form-control form-control-sm" value={text} placeholder="Write something" onChange={this.textChange} style={{  borderRadius: '10px', float:'left', width:'70%'}}></input>
        <select className="form-control form-control-sm" value={filtr} onChange={this.filtrChanged} style={{width:'28%', borderRadius: '10px', marginBottom:'2px'}}>
            <option value="Price">Price</option>
            <option value="endDate">Ends</option>
            <option value="startDate">Start</option>
            <option value="City">City</option>
          </select>
        <Button className="rounded-pill" variant="success" size="sm" onClick={() => {this.props.changeVisibility()}}>Filtr</Button>
        &nbsp;
        <Button className="rounded-pill" variant="warning" size="sm" onClick={() => {this.props.changeVisibility()}}>Cancel</Button>
      </div>
    );
  }
}

export default OfferFiltr