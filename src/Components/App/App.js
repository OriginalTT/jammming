import React from "react"
import './App.css';
import { SearchBar } from "../SearchBar/SearchBar";
import { SearchResults } from "../SearchResults/SearchResults";
import { Playlist } from "../Playlist/Playlist";

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sarchResults: [{
        name: "Blue",
        artist: "Tentaro",
        album: "Green",
        id: 1
      },
      {
        name: "Red",
        artist: "Tentaro",
        album: "Green",
        id: 2
      },
      {
        name: "White",
        artist: "Alex",
        album: "Peach",
        id: 3
      }]
    };
  }

  render() {
    return (
      <div>
        <h1>Ja<span class="highlight">mmm</span>ing</h1>
        <div class="App">
          <SearchBar />
          <div class="App-playlist">
            <SearchResults searchResults={this.state.sarchResults} />
            <Playlist />
          </div>
        </div>
      </div>
    );
  }
}