import React, { Component } from "react";
import CardList from "../components/CardList";
import Scroll from "../components/Scroll";
import SearchBar from "../components/SearchBar";

class App extends Component {
  constructor() {
    super();
    this.state = {
      robo: [],
      searchField: ""
    };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(response => {
        return response.json();
      })
      .then(users => {
        this.setState({ robo: users });
      });
  }

  onSearchChange = event => {
    this.setState({ searchField: event.target.value });
    //console.log(event.target.value);
  };

  render() {
    const filteredRobos = this.state.robo.filter(robo => {
      return robo.name
        .toLowerCase()
        .includes(this.state.searchField.toLowerCase());
    });

    if (this.state.robo.length === 0) {
      return (
        <div className="tc load animated infinite heartBeat delay-0s">
          <h1>Loading</h1>
        </div>
      );
    } else {
      return (
        <div className="tc">
          <h1>Robo Search</h1>
          <SearchBar searchChange={this.onSearchChange} />
          <Scroll>
            <CardList robo={filteredRobos} />
          </Scroll>
        </div>
      );
    }
  }
}

export default App;
