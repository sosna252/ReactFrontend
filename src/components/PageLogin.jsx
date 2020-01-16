import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { UserLogging } from '../redux/actions'


class PageLogin extends React.Component {
constructor(props){
    super(props);
    this.state={
        login:null
    }
    this.loginChanged=this.loginChanged.bind(this);
    this.logging=this.logging.bind(this);
}

loginChanged(e)
{
    this.setState({login:e.target.value});
}

logging(e)
{
    e.preventDefault();
    var user;
    fetch('http://localhost:3004/users')
      .then((data) => data.json())
      .then(
          (users) => { 
              user=users.find((u)=>u.email==this.state.login)
              if(user)
              {
                  this.props.UserLogging(user);
                  this.props.history.push("/list");
          }})
}

    render(){
    
    return(
        <form onSubmit={this.logging}>
            <label>Login: <input type="text" onChange={this.loginChanged}></input></label>
            <button type="submit">Login</button>
        </form>
    )

}
}

const mapStateToProps = (state) => {
    return {       
    };
  };
  
  const mapDispatchToProps = dispatch => ({
    UserLogging: (login)=> dispatch(UserLogging(login))
  });
  
  export default connect(mapStateToProps, mapDispatchToProps) (withRouter(PageLogin));