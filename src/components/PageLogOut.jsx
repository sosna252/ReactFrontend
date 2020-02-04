import React from 'react';
import Button from 'react-bootstrap/Button';
import { NavLink } from "react-router-dom";

function PageLogOut() {

    return(
        <div className="bg" style={{ width: '1004px' }}>
            <div align="center" style={{ width: '944px', position: 'relative' }}>
                <h1 align="center">You have to Log In:</h1>
                <br />
                <NavLink exact activeClassName="active" to="/">                            
                    <Button>Home page</Button>
                </NavLink>                        
            </div>
        </div>
    )
    
}
export default PageLogOut;