import React from "react";
import { NavLink } from "react-router-dom";
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { UserLogOut } from '../redux/actions';

class Header extends React.Component {
  constructor(props) { 
    super(props);
    this.logOut = this.logOut.bind(this);
  }

  logOut(){
    this.props.UserLogOut();
    this.props.history.push("/");
  }

  render(){
    return (
      <nav className="menu" style={{position:'relative', width: '100%', margin: 'auto', height: '55px'}}>
        <NavLink exact activeClassName="active" to="/">
        <Button variant="light" className="rounded-circle" style={{marginTop: '5px', marginLeft: '3px'}}><i className="fa fa-home "></i></Button>
        </NavLink>
        {
        this.props.login ? 
          <Button variant="dark" className="rounded-pill" onClick={this.logOut} style={{marginTop: '5px', right:'175px', position:'absolute'}}> <i className="fa fa-sign-out" ></i> Log Out</Button>
         :
          null
         }
        <NavLink activeClassName="active"  to="/list">
          <Button variant="primary" className="rounded-pill" style={{marginTop: '5px', right:'80px', position:'absolute'}}><i className="fa fa-list "></i> Offers</Button>
        </NavLink>
        <NavLink activeClassName="active" to="/new">
          <Button variant="secondary" className="rounded-pill" style={{marginTop: '5px', right:'3px', position:'absolute'}}><i className="fa fa-plus "></i> Add</Button>
        </NavLink>
      </nav>  
    );
  }
  
}

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    login: state.login,
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => ({
  UserLogOut: () => dispatch(UserLogOut()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Header));