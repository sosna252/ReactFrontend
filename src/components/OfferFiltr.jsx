
import React from 'react'

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
        <button onClick={() => {this.props.changeVisibility()}}>Filtr</button>
        <button onClick={() => {this.props.changeVisibility()}}>Cancel</button>
      </div>
    );
  }
}

export default OfferFiltr