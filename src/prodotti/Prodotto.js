import React from "react"
import 'bootstrap/dist/css/bootstrap.css';
import "./Prodotti.css"
import $ from "jquery"

class Prodotto extends React.Component {

    constructor(props){
      super(props);
      this.state = this.props.product;
    }


    addToCart = (product) => {
        let success= false;
        let id= this.props.idCarrello;
        var settings = {
            "url": "http://localhost:8080/api/ordini/" + id + "/prodotti/" + product.id,
            "method": "PUT",
            "headers": {
                "Content-Type": "application/json"
            },
        };
            
        $.ajax(settings).done(function (response) {
            console.log(response);
            success=true;
        });

        if(success)
            this.props.addToCart(product)
    }


    render() {
        return(
            <div>
                <div className="card" style={{width:"33%", float:"left"}}>    
                    <img class="card-img-top" src={this.state.url_foto} alt="Foto non disponibile"/>
                    
                    <div class="card-body">
                        <h5 class="card-title">{this.state.nome}</h5>
                        <p class="card-text">{this.state.descrizione}</p>
                    </div>
                    
                    <ul id="prezzo+categoria" class="list-group list-group-flush">
                        <li class="list-group-item">Categoria: {this.state.tipologia}</li>
                        <li class="list-group-item">Prezzo: {this.state.prezzo}€</li>
                    </ul>
                    
                    <ul id="disponibilita+bottone" class="list-group list-group-flush">
                        <li class="list-group-item">
                            {this.state.attivo ?
                                (
                                    <div>
                                        {/*<b id="disp">Prodotto disponibile</b>*/}                                       {/**  this.addToCart(this.props.product) */}
                                        <button className="button" style={{verticalAlign: "middle"}} onClick={() => this.addToCart(this.state)}>
                                            <span>Aggiungi al carrello</span>
                                        </button>
                                    </div>
                                ) 
                                                : 
                                (
                                    <div>
                                        {/*<b id="nonDisp" color="red">Prodotto non disponibile</b>*/}
                                        <button className="button" style={{pointerEvents:"none", backgroundColor:"gray" , verticalAlign: "middle"}}>
                                            <span>Non disponibile</span>
                                        </button>
                                    </div>
                                )
                            }
                        </li>
                    </ul>        
                </div>
            </div>
        );
    }
}

export default Prodotto;