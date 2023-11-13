import React from "react"
import 'bootstrap/dist/css/bootstrap.css';
import "./Sidebar.css"
import $ from 'jquery';

class Sidebar extends React.Component {
  
  constructor(props) {
    super(props);   
    this.state= {categorie:[]}
  }

  HandleChanges = (e) => {
    let vettore = this.state.categorie;
    let categoria = e.target.value;

    if(!vettore.includes(categoria)) {
      vettore.push(categoria)
      this.setState({categorie:vettore, loaded:true})
      $('#checkbox0').attr( "checked", false);
    }
    else {
      vettore = vettore.filter(el => el!==categoria)
      this.setState({categorie:vettore, loaded:true})
      $('#checkbox0').attr( "checked", false);
    }

    this.props.FiltraCategoria(vettore)
  }


  render() {   
    return (
    <div id="sidebox">
      <div id="sidebar">
        <h3>Type of product</h3>
        <input type="checkbox" id="checkbox0" name="checkbox1" value="Tutte" checked="true"/>
        <label for="checkbox1">Tutte</label><br/>

        <input type="checkbox" id="checkbox1" name="checkbox1" value="Casalinghi" onChange={this.HandleChanges}/>
        <label for="checkbox1">Casalinghi</label><br/>

        <input type="checkbox" id="checkbox2" name="checkbox2" value="Elettronica" onChange={this.HandleChanges}/>
        <label for="checkbox2">Elettronica</label><br/>

        <input type="checkbox" id="checkbox3" name="checkbox3" value="Sex Toys" onChange={this.HandleChanges}/>
        <label for="checkbox3">Sex Toys</label><br/>

        <input type="checkbox" id="checkbox4" name="checkbox4" value="Piante" onChange={this.HandleChanges}/>
        <label for="checkbox4">Piante</label><br/>

        <input type="checkbox" id="checkbox5" name="checkbox5" value="Statue" onChange={this.HandleChanges}/>
        <label for="checkbox5">Statue</label><br/>

        <input type="checkbox" id="checkbox6" name="checkbox6" value="Puzzle" onChange={this.HandleChanges}/>
        <label for="checkbox6">Puzzle</label><br/>

        <input type="checkbox" id="checkbox6" name="checkbox6" value="Libri" onChange={this.HandleChanges}/>
        <label for="checkbox6">Libri</label><br/>

        <input type="checkbox" id="checkbox6" name="checkbox6" value="Videogiochi" onChange={this.HandleChanges}/>
        <label for="checkbox6">Videogiochi</label><br/>
      </div> 
    </div> 
    );
  }
}

export default Sidebar;