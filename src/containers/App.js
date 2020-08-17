import React, {Component} from 'react';
import classes from './App.css';

import Person from '../components/Persons/Person/Person';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import Persons from "../components/Persons/Persons";
import Cockpit from "../components/Cockpit/Cockpit";
import withClass from '../hoc/withClass';
import Aux from '../hoc/Auxiliary';
import AuthContext from '../context/auth-context';


class App extends Component {
    state = {
        persons: [
            {id: 1, name: "Max", age: 28},
            {id: 2, name: "Viki", age: 21},
            {id: 3, name: "Feri", age: 24}
        ],
        showPersons: false,
        authenticated: false
    };

    deletePersonHandler = (personIndex) => {
        // const persons = this.state.persons.slice();
        const persons = [...this.state.persons];
        persons.splice(personIndex, 1);
        this.setState({persons: persons});
    };

    nameChangedHandler = (event, id) => {
        const personIndex = this.state.persons.findIndex(p => {
            return p.id === id;
        });

        const person = {...this.state.persons[personIndex]};

        person.name = event.target.value;

        const persons = [...this.state.persons];
        persons[personIndex] = person;

        this.setState({persons: persons})
    };
    togglePersonsHandler = () => {
        const doesShow = this.state.showPersons;
        this.setState({showPersons: !doesShow});
    };

    loginHandler = () => {
        this.setState({authenticated: true})
    };

    render() {

        let persons = null;
        if (this.state.showPersons) {
            persons =
                <Persons
                     persons={this.state.persons}
                     clicked={this.deletePersonHandler}
                     changed={this.nameChangedHandler}
                     isAuthenticated={this.state.authenticated} />;

        }

        return (
            <Aux classes={classes.App}>
             <AuthContext.Provider value={{
                 authenticated: this.state.authenticated,
                 login: this.loginHandler}}>
            <Cockpit
                    title={this.props.appTitle}
                    showPersons={this.state.showPersons}
                     personsLength={this.state.persons.length}
                     login={this.loginHandler}
                    clicked={this.togglePersonsHandler}/>
                {persons}
             </AuthContext.Provider>
            </Aux>
        );
        //  return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Ha ha ha '))
    }
}

export default withClass(App, classes.App);
