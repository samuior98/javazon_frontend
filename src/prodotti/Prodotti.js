import React from "react"
import 'bootstrap/dist/css/bootstrap.css';
import "./Prodotti.css"
import Prodotto from "./Prodotto";

class Prodotti extends React.Component {

  constructor(props) {
    super(props);   
    //this.state= {cartList:[]};
  }

  
  filterProduct() {
    return this.props.prodotti
      .filter(product =>
                        product.prezzo >= this.props.minimo  &&
                        product.prezzo <= this.props.massimo &&
                        product.nome.toLowerCase().includes(this.props.nome.toLowerCase()))
      .map(product =>   <Prodotto key={product.id} product={product} addToCart={this.props.addToCart} idCarrello={this.props.idCarrello}/>)
  }

  filterProductPlusCat(){
    return this.props.prodotti
    .filter((product) =>
      product.prezzo >= this.props.minimo  &&
      product.prezzo <= this.props.massimo &&
      product.nome.toLowerCase().includes(this.props.nome.toLowerCase()) &&
      this.props.tipologie.includes(product.tipologia))
    .map(product => <Prodotto key={product.id} product={product} addToCart={this.props.addToCart} idCarrello={this.props.idCarrello}/>);
  }


  render() { 
    if(this.props.tipologie.length === 0) {
      return (
        <div id="prodotti">
          {this.filterProduct()}
        </div>
      );
    }

    else {
      return (  
        <div id="prodotti">
          {this.filterProductPlusCat()}
        </div>
      );
    }
  }
}

export default Prodotti;