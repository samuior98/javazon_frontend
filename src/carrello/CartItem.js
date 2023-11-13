import React from "react"
import 'bootstrap/dist/css/bootstrap.css';

class CartItem extends React.Component {

  constructor(props) {
      super(props);
  }


  render() {
    return(        
        <div class="item">
            <div class="buttons">
                <span class="delete-btn">
                    <input type="button" className="btn btn-danger" value="X" onClick={() => this.props.list(this.props.key)}/>
                </span>
            </div>
        
            <div class="image">
                <img src={this.props.prodotto.url_foto} alt="foto"/>
            </div>
        
            <div class="description">
                <span>{this.props.prodotto.nome}</span>
                <span>{this.props.prodotto.tipologia}</span>
            </div>

            {/*     
            <div class="quantity">
            <button class="plus-btn" type="button" name="button">
                <img src="plus.svg" alt="" />
            </button>
            <input type="text" name="name" value="1">
            <button class="minus-btn" type="button" name="button">
                <img src="minus.svg" alt="" />
            </button>
            </div>
            */}
            
            <div class="total-price">{this.props.prodotto.prezzo}</div>
        </div>
    );
  }
}

export default CartItem;