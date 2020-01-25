import React from "react";
import { NavLink } from "react-router-dom";
import Button from 'react-bootstrap/Button';

function Header() {
  return (
    <nav calssName="menu" style={{position:'relative', width: '100%', margin: 'auto'}}>
      <NavLink exact activeClassName="active" to="/">
      <Button variant="light" style={{marginTop: '5px', marginLeft: '3px'}}>Home</Button>
      </NavLink>
      <NavLink activeClassName="active"  to="/list">
      <Button variant="primary" style={{marginTop: '5px', right:'90px', position:'absolute'}}>Offers</Button>
      </NavLink>
      <NavLink activeClassName="active" to="/new">
      <Button variant="secondary" style={{marginTop: '5px', right:'3px', position:'absolute',}}>Add new</Button>
      </NavLink>
    </nav>  
  );
}
export default Header;