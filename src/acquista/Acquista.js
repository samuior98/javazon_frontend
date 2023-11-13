import React from "react"
import 'bootstrap/dist/css/bootstrap.css';
import "./Acquista.css";

class Acquista extends React.Component {

    constructor(props) {
        super(props);  
    }

    render() {
        return(   
            <div id="acquista">
                <input type="button" className="btn btn-success" value="Acquista"/>
            </div>
        );
    }
}  

export default Acquista;