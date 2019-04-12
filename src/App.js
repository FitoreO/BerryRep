import React, { Component } from "react";
import "./index.css";
import Modal from "./components/Modal/Modal";
const sortBy = require("sort-by");

function getImageForBerry(name) {
  return `https://raw.githubusercontent.com/PokeAPI/pokeapi/master/data/v2/sprites/items/berries/${name}-berry.png`;
}

function getIdFromUrl(url) {
  return url.split("/")[6];
}

const API = "https://pokeapi.co/api/v2/berry?offset=0&limit=1000";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      results: [],
      sortBy: "name",
      filter: "",
      search: "",
      isShowing: false,
      selectedBerryId: ""
    };
  }

  openModalHandler = berryId => {
    this.setState({
      isShowing: true,
      selectedBerryId: berryId
    });
  };

  closeModalHandler = () => {
    this.setState({
      isShowing: false
    });
  };

  handleSort(field, event) {
    event.preventDefault();
    this.setState({
      sortBy: field
    });
  }

  handleSearch() {
    this.setState({
      search: this.refs.addInput.value
    });
  }

  componentDidMount() {
    this.populateAppWithData();
  }

  populateAppWithData() {
    const berryData = fetch(API)
      .then(response => response.json())
      .then(data => this.setState({ results: data.results }));

    return berryData;
  }

  render() {
    const results = this.state.results
      .slice()
      .sort(sortBy(this.state.sortBy))
      .filter(
        result =>
          this.state.search === ""
            ? result
            : result.name.startsWith(this.state.search)
        // !this.state.search ? true : result.name === this.state.search
      )
      .map((result, index) => (
        <li
          onClick={this.openModalHandler.bind(this, getIdFromUrl(result.url))}
          className={result.name}
          key={"result" + index}
        >
          <p>
            {" "}
            <img src={getImageForBerry(result.name)} />{" "}
          </p>
          <p>
            {result.name}
            {""}
          </p>
        </li>
      ));

    return (
      <div>
        <h1>Berries!</h1>
        {this.state.isShowing ? (
          <div onClick={this.closeModalHandler} className="back-drop" />
        ) : null}

        {this.state.isShowing && (
          <Modal
            className="modal"
            show={this.state.isShowing}
            close={this.closeModalHandler}
            berryId={this.state.selectedBerryId}
          />
        )}
        <p>
          <input
            type="text"
            className="input"
            ref="addInput"
            placeholder="search for berries"
            onKeyUp={this.handleSearch.bind(this)}
          />

          {/* <button>Search</button> */}
        </p>
        <button onClick={this.handleSort.bind(this, "name")}>
          {" "}
          Sort with names
        </button>
        <div>{results}</div>
      </div>
    );
  }
}

export default App;
