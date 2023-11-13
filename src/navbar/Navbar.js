import React from "react"
import 'bootstrap/dist/css/bootstrap.css';
import './Navbar.css';
import LogoTrasparente from "./img/LogoTrasparente.png";

class Navbar extends React.Component {

  constructor(props) {
    super(props);
  }

  HandleChanges = (e) => {
    this.props.FiltraNome(e.target.value)
  }

  logout = () => {
    localStorage.setItem("username", "");
    localStorage.setItem("token", "");
    window.location.reload();
  }


  render() {
    return (
      <div id= "navbox">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <img src={LogoTrasparente} alt="logo"/>
           
          <div class="collapse navbar-collapse" id="navbarText">
            <ul class="navbar-nav mr-auto">
              <span>
                <h4>Hi {this.props.user}!</h4>
              </span>

              <li>
                <button type="button" name="LOGOUT" value="LOGOUT" className="btn btn-danger" onClick={this.logout}>LOGOUT</button>
              </li>
              
              <li class="nav-item active">
                <input class="form-control mr-sm-2" type="search" placeholder="Search..." aria-label="Search" onChange={this.HandleChanges}/>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;