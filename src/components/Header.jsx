import React from "react";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <nav style={{position:'relative'}}>
      <NavLink exact activeClassName="active" to="/">
      <button>Home</button>
      </NavLink>
      <NavLink activeClassName="active"  to="/list">
      <button style={{right:'40px', position:'absolute'}}>Offers</button>
      </NavLink>
      <NavLink activeClassName="active" to="/new">
      <button style={{right:'3px', position:'absolute',}}>Add</button>
      </NavLink>
    </nav>  
  );
}
export default Header;