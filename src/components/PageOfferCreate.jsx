import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { offerAdd } from '../redux/actions'

class PageOfferCreate extends React.Component {
  constructor(props) { 
    super(props);

    this.descriptionChanged = this.descriptionChanged.bind(this);
    this.cityChanged = this.cityChanged.bind(this);
    this.adresChanged = this.adresChanged.bind(this);
    this.countryChanged = this.countryChanged.bind(this);
    this.roomNumberChanged = this.roomNumberChanged.bind(this);
    this.priceChanged = this.priceChanged.bind(this);
    this.bedsChanged = this.bedsChanged.bind(this);
    this.createOffer = this.createOffer.bind(this);

    //this.startDateChanged = this.startDateChanged.bind(this);
    
    this.state = {
      authorId:'',
      startDateTime: '',
      endDateTime: '',
      description: '',
      photo: '',
      roomNumber: 0,
      beds: 0,
      price: 10,
      rating: 0,
      city: '',
      address: '',
      country:'Poland',      
      isSaving: false,
      error: null      
    }
  }

  descriptionChanged(e) {
    this.setState({ description: e.target.value });
  }

  cityChanged(e) {
    this.setState({ city: e.target.value });
  }

  adresChanged(e) {
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

  

  createOffer() {
   // console.log('hey');
    this.setState({ isSaving: true });  
    const {
      authorId,
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
    console.log(offer);
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
        this.props.offerAdd(offer);
        this.props.history.push("/list");
      }
    })  
  }

  render() {
    const {
      description,
      roomNumber,
      beds,
      price,
      city,
      address,
      country,
      isSaving,
      error
    } = this.state;

    return (
      <div>
        <h1>Enter offer data:</h1>
        <div>Room Number: <input type="number" min="1" value={roomNumber} onChange={this.roomNumberChanged} disabled={isSaving}/></div>
        <div>Number of beds: <input type="number" min="1" value={beds} onChange={this.bedsChanged} disabled={isSaving}/></div>
        <div>Price: <input type="number"  min="10" value={price} onChange={this.priceChanged} disabled={isSaving}/></div>
        <div>City: <input type="text"  value={city} onChange={this.cityChanged} disabled={isSaving}/></div>
        <div>Address: <input type="text"  value={address} onChange={this.adresChanged} disabled={isSaving}/></div>
        <div>Country: 
          <select value={country} onChange={this.countryChanged} disabled={isSaving}>
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
        <div>Description: 
          <br/>
          <input type="text" minLength="20" maxLength="250" value={description} onChange={this.descriptionChanged} disabled={isSaving}/>
        </div>
        {!isSaving ? <button onClick={this.createOffer}>Create offer</button> : <p>Saving ...</p>}
        {error && <p>An error occured: {error}</p>}
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {     
  };
};

const mapDispatchToProps = dispatch => ({
  offerAdd: newoffer => dispatch(offerAdd(newoffer))
});

export default connect(mapStateToProps, mapDispatchToProps) (withRouter(PageOfferCreate));