import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { offerAdd } from '../redux/actions'
import Button from 'react-bootstrap/Button';
import PageLogOut from './PageLogOut';

class PageOfferCreate extends React.Component {
  constructor(props) { 
    super(props);
    
    this.state = {
      title: '',
      start_date_time: getParsedDate(new Date().toLocaleDateString()),
      end_date_time: getParsedDate(new Date().toLocaleDateString()),
      description: '',
      photo: null,
      room_number: 1,
      beds: 1,
      price: 10,
      rating: 0,
      city: '',
      address: '',
      country:'Poland',      
      isSaving: false,
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
    this.photoChanged = this.photoChanged.bind(this);
    this.startDateChanged = this.startDateChanged.bind(this);
    this.endDateChanged = this.endDateChanged.bind(this);
    this.createOffer = this.createOffer.bind(this);

  }

  descriptionChanged(e) {
    this.setState({ description: e.target.value });
  }

  photoChanged(e){
    this.setState({photo: e.target.files[0]});
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

  startDateChanged(e){
    var date = getParsedDate(new Date(e.target.value).toLocaleDateString());
    this.setState({start_date_time: date})
  }
  endDateChanged(e){
    var date = getParsedDate(new Date(e.target.value).toLocaleDateString());
    this.setState({end_date_time: date})
  }

  bedsChanged(e) {
    this.setState({ beds: Number(e.target.value) });
  }

  createOffer (e) {
    e.preventDefault();
    this.setState({ isSaving: true });  
    const {
      title,
      start_date_time,
      end_date_time,
      description,
      photo,
      room_number,
      beds,
      price,
      rating,
      city,
      address,
      country
    } = this.state;
    
    var offer = {
      "start_date_time": start_date_time,
      "end_date_time": end_date_time,
      "title": title,
      "description": description,
      "room_number": room_number,
      "beds": beds,
      "price": price,
      "rating": (Math.floor(Math.random() * (5 - 1)) + 1),
      "city": city,
      "address": address,
      "country": country
    };
    fetch('http://flatlybackend-env.apt77knte5.us-east-1.elasticbeanstalk.com/items', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'securityTokenValue': this.props.user
      },
      body: JSON.stringify(offer)
    })
    .then((response) => response.json())
    .then(res => {
        this.props.offerAdd(offer);
        this.addPhoto(res.id);

    })
    this.props.history.push("/list");
  }
  addPhoto(id){
    console.log(this.state.photo)
    fetch('http://flatlybackend-env.apt77knte5.us-east-1.elasticbeanstalk.com/'+id+'/itemphoto', {
      method: 'POST', 
      headers: {
        'Content-Type': 'image/jpeg',
        'securityTokenValue': this.props.user
      },
      body: this.state.photo
    })
    .then(res => {
      if(res.status !== 200) {
        this.setState({ isSaving: false, error: `Saving returned status ${res.status}`})
        alert("Something wrong");
      } else {
        this.props.history.push("/list");
      }
    })  
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
        {!this.props.login ? <PageLogOut />
        :
          <div className="bg" style={{width: '1004px'}}>
            <div align="center" style={{width: '944px', position: 'relative'}}>
              <h1>Enter offer data:</h1>                
              <form onSubmit={(e)=>this.createOffer(e)}>
                  <div className="grid-container">
                    <div><label htmlFor="title" className="label-text">Title : </label></div>
                    <div><input id="title" className="form-control input-transfer-data "  name="title" minLength="2" type="text" value={title} onChange={this.titleChanged} disabled={isSaving} required /></div>
                    
                    <div><label className="label-text">Country : </label></div>
                    <div>
                      <select className="input-transfer-data form-control" value={country} onChange={this.countryChanged} disabled={isSaving} required>
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
                    <div><input id="city"  className="input-transfer-data form-control" name="city" value={city} onChange={this.cityChanged} disabled={isSaving} required /></div>
                    
                    <div><label htmlFor="address" className="label-text">Address : </label></div>
                    <div><input className="input-transfer-data form-control" name="address" id="address" value={address} onChange={this.addressChanged} disabled={isSaving} required /></div>
                    
                    <div><label className="label-text">Room Number : </label></div>
                    <div><input className="input-transfer-data form-control" type="number" step="1" min="1" value={room_number} onChange={this.roomNumberChanged} disabled={isSaving} required/></div>

                    <div><label className="label-text">Number of beds : </label></div>
                    <div><input className="input-transfer-data form-control" type="number" step="1" min="1" value={beds} onChange={this.bedsChanged} disabled={isSaving} required /></div>
                    
                    <div><label className="label-text">Price : </label></div>
                    <div><input className="input-transfer-data form-control" type="number" step="1" min="10" value={price} onChange={this.priceChanged} disabled={isSaving} required /></div>
                    
                    <div><label className="label-text">Photo : </label></div>
                    <div><input className="input-transfer-data btn btn-light" type="file" accept="image/png, image/jpeg" onChange={this.photoChanged} disabled={isSaving} required/></div>

                    <div><label className="label-text">Date From : </label></div>
                    <div><input className="input-transfer-data form-control" type="date" value={start_date_time} onChange={this.startDateChanged} disabled={isSaving} required/></div>
                    
                    <div><label className="label-text">Date To : </label></div>
                    <div><input className="input-transfer-data form-control" type="date"  value={end_date_time} onChange={this.endDateChanged} min={start_date_time} disabled={isSaving} required/></div>
                    

                    <div><label htmlFor="description" className="label-text">Description : </label></div>
                    <div><textarea id="description" className="input-transfer-data form-control" name="description" value={description} onChange={this.descriptionChanged} disabled={isSaving} required ></textarea></div>
                  </div>
                  <br />
                  <Button variant="success" type="submit">{!isSaving ? <span>Create offer</span> : <span>Saving ...</span>}</Button>
                  &nbsp;
                  <Button variant="warning" onClick={() => this.props.history.push("/list")} >Cancel</Button> 
              </form>
              <br />
            </div>
          </div>
        }
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
  offerAdd: newoffer => dispatch(offerAdd(newoffer))
});

function getParsedDate(strDate){
  var datesplit = strDate.split('.');
  if (datesplit[0] < 10) {
    datesplit[0] = '0' + datesplit[0];
  }
  var date =  datesplit[2] + "-" + datesplit[1] + "-" + datesplit[0];
  return date.toString();
}

export default connect(mapStateToProps, mapDispatchToProps) (withRouter(PageOfferCreate));