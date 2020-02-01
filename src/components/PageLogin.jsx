import React from 'react'
import Button from 'react-bootstrap/Button';

class PageLogin extends React.Component {
    constructor(props) { 
        super(props);
        this.state = {
          login:'',
          password: '',
          error: null      
        }
    
        this.loginChanged = this.loginChanged.bind(this);
        this.passwordChanged = this.passwordChanged.bind(this);
        this.logging=this.logging.bind(this);
    
    }
    
    passwordChanged(e) {
    this.setState({ password: e.target.value });
    }

    loginChanged(e) {
    this.setState({ login: e.target.value });
    }

    logging(e){        
        e.preventDefault();
        var user={
            "login": this.state.login,
            "password": this.state.password
        }
        console.log(user);
        fetch('http://flatlybackend-env.apt77knte5.us-east-1.elasticbeanstalk.com/login', {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then((response) => response.json())
        .then(res => {
            
            if(res.message) {
               alert(`${res.message}`);
            }
            else {
                console.log(res)
            //this.props.UserLogging(user);
            //console.log(user);
           // this.props.history.push("/list");
            }
        })
    }


    render(){
        return(
            <div align="center">
                <div className="bg" style={{ width: '1004px' }}>
                    <div align="left" style={{ width: '944px', position: 'relative' }}>
                        <h1 align="center">Log in:</h1>
                        <form onSubmit={this.logging}>
                            <div align="center"><label  className="label-text"><b>Login : </b></label></div>
                            <div align="center"><input className="input-transfer-data form-control" onChange={this.loginChanged}/></div>
                            <br />
                            <div align="center"><label  className="label-text"><b>Password : </b></label></div>
                            <div align="center"><input className="input-transfer-data form-control" type="password" onChange={this.passwordChanged}/></div>
                            <br />
                            <div align="center"><Button  type="submit" variant="outline-primary">Log in</Button></div>
                        </form>
                        <br />
                    </div>
                </div>
            </div>
        )

    }
}
export default PageLogin 