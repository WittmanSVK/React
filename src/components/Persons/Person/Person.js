import React, {Component, Fragment} from 'react';
import classes from "./Person.css";
import withClass from '../../../hoc/withClass';
import Aux from '../../../hoc/Auxiliary';
import AuthContext from '../../../context/auth-context';

class Person extends Component{

    static contextType = AuthContext;

    componentDidMount(){
        this.inputElement.focus()
    }

    render() {
    return (
        <Aux>

                {this.context.authenticated ? <p>Authenticated!</p> : <p>Please log in</p>}

            <p onClick={this.props.click}>I am {this.props.name} and I am {this.props.age} years old!</p>
            <p>{this.props.children}</p>
            <input ref={(inputEl) => {this.inputElement = inputEl}} type="text" onChange={this.props.changed} value={this.props.name}/>

        </Aux>

    )
}
};

export default withClass(Person, classes.Person);