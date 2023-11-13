import React from "react"
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from "./navbar/Navbar";
import Sidebar from "./sidebar/Sidebar";
import Prodotti from "./prodotti/Prodotti";
import Carrello from "./carrello/Carrello";
import MultiRangeSlider from "./multiRangeSlider/MultiRangeSlider";
import "./styles.css";
import "./App.css"
import Acquista from "./acquista/Acquista.js";
import $ from "jquery"
import "./LoginCSS.css";

class App extends React.Component {

  componentDidMount()  {
    if(localStorage.getItem('token'))
      $.ajaxSetup({
        headers: {"Authorization":"Bearer "+localStorage.getItem('token')}});

    $.getJSON("api/prodotti", (data) => {
      this.setState({loaded:true, prodotti:data})
    }).fail(() => {
      this.setState({needLogin:true});
      $.ajaxSetup({headers:{"Authorization":""}});
    });
  }

  constructor(props) {
    super(props);
    this.state= {min:1, max:1000, tipologie:[], nome:"", cartList:[], tempCredentials:{}, dataRegister:{}, userInDb:""};
  }


  filtraNome = (chiave) => {
    this.setState({nome:chiave})
  }

  filtraProdotti = (e) => {
    this.setState({min:e.min, max:e.max})
  }

  filtraCategoria = (vettore) => {
    this.setState({tipologie:vettore});
  }

  addToCart= (p) => {
    let cartList= this.state.cartList;
    cartList.push(p);
    //cartList.prodotti.push(p);
    this.setState({"cartList":cartList});
  }

  removeFromCart = (indice) => {
    let cartList= this.state.cartList;
    cartList.splice(indice, 1);
    //cartList.prodotti.splice(indice, 1);
    this.setState({"cartList":cartList});
  }


  handleChange = (e) => {
    let tempCredentials = this.state.tempCredentials;
    tempCredentials[e.target.name] = e.target.value;
    this.setState({tempCredentials: tempCredentials});
  }


  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state.tempCredentials)
    var settings = {
      "url": "http://localhost:8080/authenticate",
      "method": "POST",
      "timeout": 0,
      "data": JSON.stringify(this.state.tempCredentials),
      "headers": {
        "Content-Type": "application/json"
      }
    };
    
    $.ajax(settings).done(responseConToken => {
        localStorage.setItem("token", responseConToken.token);
        localStorage.setItem("username", this.state.tempCredentials.username);
        window.location.reload();
    }).fail(() => {
      this.setState({"pswErr": "Incorrect password or user not registered"})});
      //$('#formm')[0].reset();
      $('#formLoginNew')[0].reset();
  }


  showRegisterForm() {
    $('#divRegister').show();
  }

  handleChangeRegForm = (e) => {
    let dataRegister2= this.state.dataRegister;
    dataRegister2[e.target.name]= e.target.value;
    this.setState({dataRegister:dataRegister2});
  }


  handleRegistration = (e) => {
    e.preventDefault();
    let usernameToInsert= this.state.dataRegister.username;

    var settings = {
      "url": "http://localhost:8080/api/users/"+usernameToInsert+"/username",
      "method": "GET",
      "timeout": 0,
      "headers": {
        "Content-Type": "application/json"
      }
    };

    $.ajax(settings).done(response => {
      localStorage.setItem("respUser", response.username);
    }).fail(() => {
        this.setState({"userInDb" : "NO"});
        this.register();
      }
    );

    let respUsers= localStorage.getItem("respUser");
    if(respUsers === usernameToInsert) {
      this.setState({"userInDb" : "SI"});
      this.setState({"pswInc": "USER ALREADY REGISTERED!"})
    }
  }


  register= () => {
    var settings = {
      "url": "http://localhost:8080/register",
      "method": "POST",
      "timeout": 0,
      "data": JSON.stringify(this.state.dataRegister),
      "headers": {
        "Content-Type": "application/json"
      }
    };
    
    $.ajax(settings).done(responseConToken => {
      localStorage.setItem("token", responseConToken.token);
      localStorage.setItem("username", this.state.dataRegister.username);
      window.location.reload();
    }).fail(
      this.setState({"pswInc": "PASSWORD NOT VALID! "})
    );
  }


  showPsw = (elem) => {
    var ty= elem.attr("type") == "password" ? "text" : "password";
    elem.attr("type", ty);
  }


  getCarrello() {
    $.getJSON("api/clienti/" + this.state.dataRegister.username + "/username", (data) => {
      this.setState({loaded:true, idUser:data.id})
    });


    $.getJSON("api/clienti/" + this.state.idUser + "/carrelloId", (data) => {
      this.setState({loaded:true, carrello:data})
    }).fail(() => {
      this.setState({needLogin:true});
      $.ajaxSetup({headers:{"Authorization":""}});
    });
  }


  render() {
    if(this.state.needLogin)
      return (
        <div id="loginNew">
          <link rel="preconnect" href="https://fonts.gstatic.com"/>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"/>
          <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;600&display=swap" rel="stylesheet"/>
          {/*
          <h2>WELCOME TO JAVAZON SHOP ONLINE</h2> <br/> 
          <div id="divLogin">
            <h3>Login</h3>
            <form onSubmit={this.handleSubmit} id="formm">
              <input type="text" name="username" placeholder="Insert username" onChange={this.handleChange} required/> <br/>
              <input type="password" name="password" placeholder="Insert password" onChange={this.handleChange} required/> <br/><br/>
              <input type="submit" className="btn btn-success btn-sm" value="Login"/>
            </form>

            <br/>
            <p style={{color:"white"}}>{this.state.pswErr}</p>
          </div>

          <br/><br/>
            
          <p>
            Not a member?  <button type="button" className="btn btn-primary btn-sm" onClick={this.showRegisterForm}>Register now</button>
          </p>
          
          <div id="divRegister" style={{display:"none"}}>
            <h3>Register</h3>
              <form onSubmit={this.handleRegistration} id="formReg">
                <input type="text" name="username" placeholder="Insert new username" onChange={this.handleChangeRegForm} required minLength="8"/> <br/>
                <input type="password" name="password" id="psw" placeholder="Insert new password" onChange={this.handleChangeRegForm} required pattern="^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[]:;<>,.?/~_+-=|\]).{8,32}$"/> <br/>
                <input type="checkbox" onclick={this.showPsw($('#psw'))}/>Show Password <br/><br/>
                <input type="submit" className="btn btn-success btn-sm" value="Register"/>
              </form>

              <br/>
              <p> 
                Minimum 8 characters <br/>
                - one uppercase letter <br/>
                - one lowercase letter <br/>
                - one number <br/>
                - one special character
              </p>

              <br/>
              <p style={{color:"white"}}><b>{this.state.pswInc}</b></p>
          </div>
          */}



          <div class="background">
            <div class="shape"></div>
            <div class="shape"></div>
          </div>
        
          <form onSubmit={this.handleSubmit} id="formLoginNew">
            <h3>Login Here</h3>

            <label for="username">Username</label>
            <input type="text" placeholder="Username" id="username" name="username" onChange={this.handleChange} required/>

            <label for="password">Password</label>
            <input type="password" placeholder="Password" id="password" name="password" onChange={this.handleChange} required/>

            <button type="submit">Log In</button>
            
            {/*
            <div class="social">
              <div class="go"><i class="fab fa-google"></i>  Google</div>
              <div class="fb"><i class="fab fa-facebook"></i>  Facebook</div>
            </div>
            */}

            <div>
              {this.state.pswErr}
            </div>
            
            {/*<p style={{color:"white"}}></p> <br/> <br/>*/}

            <div>
              Not a member?  <button type="button" className="btn btn-primary btn-sm" onClick={this.showRegisterForm}>Register now</button>
            </div>
          </form>

            <div id="divRegister" style={{display:"none"}}>
              <form onSubmit={this.handleRegistration} id="formReg">
                <h3>Register</h3> <br/>

                <label for="username2">Username</label>
                <input type="text" id="username2" name="username" placeholder="Insert new username" onChange={this.handleChangeRegForm} required minLength="8"/> <br/>
                
                <label for="psw2">Password</label>
                <input type="password" id="psw2" name="password" placeholder="Insert new password" onChange={this.handleChangeRegForm} pattern="^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[]:;<>,.?/~_+-=|\]).{8,32}$" title="ioooo"/> <br/>
                {/*<input type="checkbox" onclick={this.showPsw($('#psw'))}/>Show Password <br/><br/>*/}
                <button type="submit">Register</button>

                <br/>
                <p> 
                  Minimum 8 characters <br/>
                  - one uppercase letter <br/>
                  - one lowercase letter <br/>
                  - one number <br/>
                  - one special character
                </p>

                <br/>
                <p style={{color:"white"}}><b>{this.state.pswInc}</b></p>
              </form>
            </div>
        </div>
      );


    if(!this.state.loaded)
      return(<div><p>NOT LOADED</p></div>)
    
    return (
      <div id= "scatolo">
        <Navbar FiltraNome= {this.filtraNome} user={localStorage.getItem("username")}/>
        <Sidebar FiltraCategoria= {this.filtraCategoria}/>
        <MultiRangeSlider
          min= {1}
          max= {1000}
          onChange= {this.filtraProdotti}
        />
        <Prodotti prodotti={this.state.prodotti} nome={this.state.nome} tipologie={this.state.tipologie} minimo={this.state.min} massimo={this.state.max} addToCart={this.addToCart} idCarrello={this.state.carrello}/>
        <Carrello cart={this.state.cartList} removeFromCart={this.removeFromCart}/>
        <Acquista/>
      </div>
    );
  }
}

export default App;