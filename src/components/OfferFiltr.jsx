import React from 'react'
import Button from 'react-bootstrap/Button';

class OfferFiltr extends React.Component {

  constructor(props) {
    super(props);
    this.state ={
        From: null,
        To: null,
        city: null,
        people: 0,
    }
    this.dateFromChanged=this.dateFromChanged.bind(this);
    this.dateToChanged=this.dateToChanged.bind(this);
    this.cityChanged=this.cityChanged.bind(this);
    this.peopleChanged=this.peopleChanged.bind(this);

  }
  cityChanged=(e) =>{
    this.setState({city: e.target.value})
  }
  peopleChanged=(e) =>{
    if(Number(e.target.value)>=0)
    {
      this.setState({ people: Number(e.target.value) })
    }
    else
    {
      this.setState({ people: 0 })
    }    
  }
  dateFromChanged=(e) =>{
    this.setState({ From: getParsedDate(new Date(e.target.value).toLocaleDateString())})
  }
  dateToChanged=(e) =>{
    this.setState({ To: getParsedDate(new Date(e.target.value).toLocaleDateString())})
  } 
  render() {
    const {
        city,
        people,
        From,
        To
      } = this.state;
    return (
      <div align="center" style={{ width:"90%"}}>
        <form onSubmit={() => {this.props.handleFiltred(city,people,From,To)}}>
        <p style={{ margin:"5px",float:'left'}}>City : </p>
        <input className="form-control form-control-sm" placeholder="Write something" onChange={this.cityChanged} style={{ borderRadius: '10px', float:'left', width:'20%'}}></input>
        <p style={{margin:"5px", float:'left'}}>No. people : </p> &nbsp;
        <input className="form-control form-control-sm" min="1" step="1" type="number" onChange={this.peopleChanged} placeholder="0" style={{ borderRadius: '10px', float:'left', width:'10%'}}></input>
        <p style={{margin:"5px", float:'left'}}>From : </p> <input className="form-control form-control-sm" onChange={this.dateFromChanged} style={{ float:'left', width: "150px"}} type="date" />
        <p style={{ margin:"5px", float:'left'}}>To : </p> <input className="form-control form-control-sm" onChange={this.dateToChanged} style={{ float:'left',width: "150px"}} type="date" />
        <div align="center" style={{margin:"10px", clear:"left"}}>
          <Button  className="rounded-pill" variant="success" size="sm" type="submit" ><i className="fa fa-search"></i> Filtr</Button>
          &nbsp;
          <Button className="rounded-pill" variant="warning" size="sm" onClick={() => {this.props.changeVisibility()}}>Cancel</Button>
          &nbsp;
          <Button className="rounded-pill" variant="danger" size="sm" onClick={() => {this.props.handleFiltred(null,0,null,null)}}>Reset</Button>
        </div>
        </form>
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