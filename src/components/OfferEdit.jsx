import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { offerEdit } from '../redux/actions'
import Button from 'react-bootstrap/Button';

class OfferEdit extends React.Component {
  constructor(props) { 
    super(props);
    
    this.state = {
      authorId: this.props.offer.authorId,
      title: this.props.offer.title,
      startDateTime: this.props.offer.startDateTime,
      endDateTime: this.props.offer.endDateTime,
      description: this.props.offer.description,
      photo: this.props.offer.photo,
      roomNumber: this.props.offer.roomNumber,
      beds: this.props.offer.beds,
      price: this.props.offer.price,
      rating: this.props.offer.rating,
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
    this.setState({ roomNumber: Number(e.target.value) });
  }

  priceChanged(e) {
    this.setState({ price: Number(e.target.value) });
  }

  bedsChanged(e) {
    this.setState({ beds: Number(e.target.value) });
  }

  editOffer (e) {
    console.log('hey');
    this.setState({ isSaving: true });  
    const {
      authorId,
      title,
      startDateTime,
      endDateTime,
      description,
      photo,
      roomNumber,
      beds,
      price,
      rating,
      city,
      address,
      country
    } = this.state;

    const offer = {
      authorId,
      title,
      startDateTime,
      endDateTime,
      description,
      photo,
      roomNumber,
      beds,
      price,
      rating,
      city,
      address,
      country
    };
    console.log(JSON.stringify(offer));
    fetch('http://localhost:3004/offers', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(offer)
    })
    .then(res => {
      if(res.status !== 201) {
        this.setState({ isSaving: false, error: `Saving returned status ${res.status}`})
      } else {
        this.props.offerEdit(offer);
        this.props.Update();
      }
    })  
  }

  render() {
    const {
      title,
      description,
      roomNumber,
      beds,
      price,
      city,
      address,
      country,
      isSaving,
    } = this.state;

    return (
      <div align="center">
        <div className="bg" style={{width: '650px'}}>
          <div align="left" style={{width: '500px', position: 'relative'}}>
            <h1 align="center">Update data:</h1>                
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
                  <div><input className="input-transfer-data form-control" type="number" step="1" min="1" value={roomNumber} onChange={this.roomNumberChanged} disabled={isSaving} /></div>

                  <div><label className="label-text">Number of beds : </label></div>
                  <div><input className="input-transfer-data form-control" type="number" step="1" min="1" value={beds} onChange={this.bedsChanged} disabled={isSaving} /></div>
                  
                  <div><label className="label-text">Price : </label></div>
                  <div><input className="input-transfer-data form-control" type="number" step="1" min="10" value={price} onChange={this.priceChanged} disabled={isSaving} /></div>
                  
                  <div><label className="label-text">Photo : </label></div>
                  <div><input className="input-transfer-data btn btn-light" type="file" accept="image/png, image/jpeg" disabled={isSaving}/></div>
                  

                  <div><label htmlFor="description" className="label-text">Description : </label></div>
                  <div><textarea id="description" className="input-transfer-data form-control" name="description" value={description} onChange={this.descriptionChanged} disabled={isSaving}></textarea></div>
                </div>
                <br />
                <Button align="right" variant="outline-success" type="submit">{!isSaving ? <span>Update</span> : <span>Saving ...</span>}</Button>
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
    };
  };
  
  const mapDispatchToProps = dispatch => ({
    offerEdit: offer => dispatch(offerEdit(offer))
  });
  
  export default connect(mapStateToProps, mapDispatchToProps) (withRouter(OfferEdit));