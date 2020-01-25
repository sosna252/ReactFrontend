
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
      <div>
        <input value={text} placeholder="Write something" onChange={this.textChange}></input>
        <select value={filtr} onChange={this.filtrChanged}>
            <option value="Price">Price</option>
            <option value="endDate">Ends</option>
            <option value="startDate">Start</option>
            <option value="City">City</option>
          </select>
          <br />
        <Button variant="success" size="sm" onClick={() => {this.props.changeVisibility()}}>Filtr</Button>
        <Button variant="warning" size="sm" onClick={() => {this.props.changeVisibility()}}>Cancel</Button>
      </div>
    );
  }
}

export default OfferFiltr