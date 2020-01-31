import React from "react";
import { NavLink } from "react-router-dom";
import Button from 'react-bootstrap/Button';

function Header() {
  return (
    <nav className="menu" style={{position:'relative', width: '100%', margin: 'auto'}}>
      <NavLink exact activeClassName="active" to="/">
      <Button variant="light" className="rounded-circle" style={{marginTop: '5px', marginLeft: '3px'}}><i className="fa fa-home "></i></Button>
      </NavLink>
      <NavLink activeClassName="active"  to="/list">
      <Button variant="primary" className="rounded-circle" style={{marginTop: '5px', right:'80px', position:'absolute'}}><i className="fa fa-list "></i> Offers</Button>
      </NavLink>
      <NavLink activeClassName="active" to="/new">
      <Button variant="secondary" className="rounded-circle" style={{marginTop: '5px', right:'3px', position:'absolute',}}><i className="fa fa-plus "></i> Add</Button>
      </NavLink>
    </nav>  
  );
}
export default Header;