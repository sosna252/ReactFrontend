import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { offerAdd } from '../redux/actions'
import Button from 'react-bootstrap/Button';

class OfferEdit extends React.Component {
  constructor(props) { 
    super(props);
    
    this.state = {
      title: this.props.offer.title,
      start_date_time: this.props.offer.start_date_time,
      end_date_time: this.props.offer.end_date_time,
      description: this.props.offer.description,
      room_number: this.props.offer.room_number,
      beds: this.props.offer.beds,
      price: this.props.offer.price,
      city: this.props.offer.city,
      address: this.props.offer.address,
      country: this.props.offer.country,
      error: null      
    }

    this.descriptionChanged = this.descriptionChanged.bind(this);
    this.cityChanged = this.cityChanged.bind(this);
    this.addressChanged = this.addressChanged.bind(this);
    this.countryChanged = this.countryChanged.bind(this);
    this.roomNumberChanged = this.roomNumberChanged.bind(this);
    this.priceChanged = this.priceChanged.bind(this);
    this.bedsChanged = this.bedsChanged.bind(this);
    this.titleChanged = this.titleChanged.bind(this);
    this.startDateChanged = this.startDateChanged.bind(this);
    this.endDateChanged = this.endDateChanged.bind(this);
    this.editOffer = this.editOffer.bind(this);

  }

  descriptionChanged(e) {
    this.setState({ description: e.target.value });
  }

  titleChanged(e) {
    this.setState({ title: e.target.value });
  }

  cityChanged(e) {
    this.setState({ city: e.target.value });
  }

  addressChanged(e) {
    this.setState({ address: e.target.value });
  }
  
  countryChanged(e) {
    this.setState({ country: e.target.value });
  }

  roomNumberChanged(e) {
    this.setState({ room_number: Number(e.target.value) });
  }

  priceChanged(e) {
    this.setState({ price: Number(e.target.value) });
  }

  bedsChanged(e) {
    this.setState({ beds: Number(e.target.value) });
  }

  startDateChanged(e){
    var date = getParsedDate(new Date(e.target.value).toLocaleDateString());
    this.setState({start_date_time: date})
  }

  endDateChanged(e){
    var date = getParsedDate(new Date(e.target.value).toLocaleDateString());
    this.setState({end_date_time: date})
  }

  editOffer (e) {
    e.preventDefault();
    this.setState({ isSaving: true });  
    const {
      title,
      start_date_time,
      end_date_time,
      description,
      room_number,
      beds,
      price,
      rating,
      city,
      address,
      country
    } = this.state;

    const offer = {
      "start_date_time": start_date_time,
      "end_date_time": end_date_time,
      "title": title,
      "description": description,
      "room_number": room_number,
      "beds": beds,
      "price": price,
      "city": city,
      "address": address,
      "country": country
    };
    fetch('http://flatlybackend-env.apt77knte5.us-east-1.elasticbeanstalk.com/item/'+this.props.offer.id, {
      method: 'PUT', 
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'securityTokenValue': this.props.user
      },
      body: JSON.stringify(offer)
    })
    .then(() => 
      this.props.Update() 
    )

  }

  render() {
    const {
      title,
      start_date_time,
      end_date_time,
      description,
      room_number,
      beds,
      price,
      city,
      address,
      country,
      isSaving,
    } = this.state;
    return (
      <div align="center">
        <div align="left" style={{width: '650px'}}>
          <div align="center" style={{width: '600px'}}>              
            <form onSubmit={(e)=>this.editOffer(e)}>
                <div className="grid-container">
                  <div><label htmlFor="title" className="label-text">Title : </label></div>
                  <div><input id="title" className="form-control input-transfer-data "  name="title" minLength="2" type="text" value={title} onChange={this.titleChanged} disabled={isSaving} /></div>
                  
                  <div><label className="label-text">Country : </label></div>
                  <div>
                    <select className="input-transfer-data form-control" value={country} onChange={this.countryChanged} disabled={isSaving}>
                      <option value="Poland">Poland</option>
                      <option value="USA">USA</option>
                      <option value="Canada">Canada</option>
                      <option value="German">German</option>
                      <option value="France">France</option>
                      <option value="Spain">Spain</option>
                      <option value="Russia">Russia</option>
                      <option value="Italy">Italy</option>
                    </select>
                  </div>
                  
                  <div><label htmlFor="city" className="label-text">City : </label></div>
                  <div><input id="city"  className="input-transfer-data form-control" name="city" value={city} onChange={this.cityChanged} disabled={isSaving} /></div>
                  
                  <div><label htmlFor="address" className="label-text">Address : </label></div>
                  <div><input className="input-transfer-data form-control" name="address" id="address" value={address} onChange={this.addressChanged} disabled={isSaving} /></div>
                  
                  <div><label className="label-text">Room Number : </label></div>
                  <div><input className="input-transfer-data form-control" type="number" step="1" min="1" value={room_number} onChange={this.roomNumberChanged} disabled={isSaving} /></div>

                  <div><label className="label-text">Number of beds : </label></div>
                  <div><input className="input-transfer-data form-control" type="number" step="1" min="1" value={beds} onChange={this.bedsChanged} disabled={isSaving} /></div>
                  
                  <div><label className="label-text">Price : </label></div>
                  <div><input className="input-transfer-data form-control" type="number" step="1" min="10" value={price} onChange={this.priceChanged} disabled={isSaving} /></div>
                  
                  <div><label className="label-text">Date From : </label></div>
                  <div><input className="input-transfer-data form-control" type="date" value={start_date_time} onChange={this.startDateChanged} disabled={isSaving}/></div>
                  
                  <div><label className="label-text">Date To : </label></div>
                  <div><input className="input-transfer-data form-control" type="date"  value={end_date_time} onChange={this.endDateChanged} min={start_date_time} disabled={isSaving}/></div>
                  

                  <div><label htmlFor="description" className="label-text">Description : </label></div>
                  <div><textarea id="description" className="input-transfer-data form-control" name="description" value={description} onChange={this.descriptionChanged} disabled={isSaving}></textarea></div>
                </div>
                <br />
                <Button variant="outline-success" type="submit">{!isSaving ? <span>Update</span> : <span>Updating ...</span>}</Button>
                &nbsp;
                <Button variant="outline-warning" onClick={() => this.props.cancelUpdate()} >Cancel</Button> 
            </form>
            <br />
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {  
    login: state.login,
    user: state.user   
  };
};

const mapDispatchToProps = dispatch => ({
  offerAdd: offer => dispatch(offerAdd(offer))
});

function getParsedDate(strDate){
  var datesplit = strDate.split('.');
  if (datesplit[0] < 10) {
    datesplit[0] = '0' + datesplit[0];
  }
  var date =  datesplit[2] + "-" + datesplit[1] + "-" + datesplit[0];
  return date.toString();
}
  
  export default connect(mapStateToProps, mapDispatchToProps) (withRouter(OfferEdit));