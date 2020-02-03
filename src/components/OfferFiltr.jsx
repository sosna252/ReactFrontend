import React from 'react'
import Button from 'react-bootstrap/Button';

class OfferFiltr extends React.Component {

  constructor(props) {
    super(props);
    this.state ={
        filtr: "-",
        From: null,
        To: null,
        city: "",
        people: 0,
    }
    this.filtrChanged=this.filtrChanged.bind(this);
    this.dateFromChanged=this.dateFromChanged.bind(this);
    this.dateToChanged=this.dateToChanged.bind(this);
    this.cityChanged=this.cityChanged.bind(this);
    this.peopleChanged=this.peopleChanged.bind(this);

  }
  filtrChanged=(e) =>{
      if(e.target.value==="-")
      {
        this.setState({filtr: e.target.value, text: ""})
      }
      else if(e.target.value==="city")
      {
        this.setState({filtr: e.target.value})
      }
      else if(e.target.value==="people")
      {
        this.setState({filtr: e.target.value})
      }
      else if(e.target.value==="date")
      {    
        this.setState({filtr: e.target.value})
      }
      console.log(this.state.filtr);
  }
  cityChanged=(e) =>{
    this.setState({ city: e.target.value})
  }
  peopleChanged=(e) =>{
    this.setState({ people: Number(e.target.value) })
  }
  dateFromChanged=(e) =>{
    this.setState({ From: getParsedDate(new Date(e.target.value).toLocaleDateString())})
  }
  dateToChanged=(e) =>{
    this.setState({ To: getParsedDate(new Date(e.target.value).toLocaleDateString())})
  } 
  render() {
    const {
        filtr,
        city,
        people,
        From,
        To
      } = this.state;
    return (
      <div align="center" style={{ width:'450px'}}>
        {filtr==="-" ?   
        <div style={{  borderRadius: '10px', float:'left', width:'70%'}}>Choose filtr</div> 
        :
         filtr ==="city"?
          <input className="form-control form-control-sm" value={city} placeholder="Write something" onChange={this.cityChanged} style={{  borderRadius: '10px', float:'left', width:'70%'}}></input>
         :
          filtr ==="people"?
            <input className="form-control form-control-sm" min="1" step="1" type="number" onChange={this.peopleChanged} placeholder="0" style={{  borderRadius: '10px', float:'left', width:'70%'}}></input>
          :
            <div style={{ width:'70%', float:'left'}} >
            <p style={{ float:'left'}}>From</p> <input className="form-control form-control-sm" onChange={this.dateFromChanged} style={{float:'left', width: "130px"}} type="date" />
            <p style={{ float:'left'}}>To</p> <input className="form-control form-control-sm" onChange={this.dateToChanged} style={{width: "130px"}} type="date" />
            </div>        
        }
        <select className="form-control form-control-sm" value={filtr} onChange={this.filtrChanged} style={{width:'28%', borderRadius: '10px', marginBottom:'2px'}}>
            <option value="none">-</option>
            <option value="city">City</option>
            <option value="date">Date</option>
            <option value="people">Number of people</option>
          </select>
          <div align="center" style={{clear:"left"}}>
            <Button  className="rounded-pill" variant="success" size="sm" onClick={() => {this.props.handleFiltred(filtr,city,people,From,To)}}>Filtr</Button>
            &nbsp;
            <Button className="rounded-pill" variant="warning" size="sm" onClick={() => {this.props.changeVisibility()}}>Cancel</Button>
          </div>
        
      </div>
    );
  }
}
function getParsedDate(strDate){
  var datesplit = strDate.split('.');
  if (datesplit[0] < 10) {
    datesplit[0] = '0' + datesplit[0];
  }
  var date =  datesplit[2] + "-" + datesplit[1] + "-" + datesplit[0];
  return date.toString();
}
export default OfferFiltr