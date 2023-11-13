import React from "react"
import 'bootstrap/dist/css/bootstrap.css';
import "./Carrello.css"
import CartItem from "./CartItem";

class Carrello extends React.Component {

  constructor(props) {
    super(props);
  }


  render() {
    return(   
      <div id="carrello">
        <h3>Carrello</h3> <br/>
        
        {this.props.cart.map((p,index) =>
          <CartItem key={index} prodotto={p} position={index} list={this.props.removeFromCart}/>
        )}
      </div>
    );
  }
}

export default Carrello;