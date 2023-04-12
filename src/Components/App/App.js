import React from "react"
import './App.css';
import { SearchBar } from "../SearchBar/SearchBar";
import { SearchResults } from "../SearchResults/SearchResults";
import { Playlist } from "../Playlist/Playlist";

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sarchResults: [
        {
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
        }
      ],
      playlistName: "My Playlist",
      playlistTracks: [
        {
          name: "name1",
          artist: "artist1",
          album: "album1",
          id: 1
        },
        {
          name: "name2",
          artist: "artist2",
          album: "album2",
          id: 2
        },
        {
          name: "name3",
          artist: "artist3",
          album: "album3",
          id: 3
        }
      ]
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
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} />
          </div>
        </div>
      </div>
    );
  }
}