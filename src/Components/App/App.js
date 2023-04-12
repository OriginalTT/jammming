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
          id: 3
        },
        {
          name: "Red",
          artist: "Tentaro",
          album: "Green",
          id: 6
        },
        {
          name: "White",
          artist: "Alex",
          album: "Peach",
          id: 7
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
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistname = this.updatePlaylistname.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
    this.setState({
      playlistTracks: this.state.playlistTracks.concat([track])
    })
  }

  removeTrack(track) {
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      const index = this.state.playlistTracks.findIndex(savedTrack => savedTrack.id === track.id);
      this.setState({
        playlistTracks: this.state.playlistTracks.toSpliced(index, 1)
      })
    }
  }

  updatePlaylistname(newName) {
    this.setState({
      playlistName: newName
    })
  }

  savePlaylist() {
    const trackUris = this.state.playlistTracks.map(track => track.uri);
  }

  search(term) {
    console.log(term);
  }

  render() {
    return (
      <div>
        <h1>Ja<span class="highlight">mmm</span>ing</h1>
        <div class="App">
          <SearchBar onSearch={this.search} />
          <div class="App-playlist">
            <SearchResults
              searchResults={this.state.sarchResults}
              onAdd={this.addTrack} />
            <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack} 
              onNameChange={this.updatePlaylistname}
              onSave={this.savePlaylist} />
          </div>
        </div>
      </div>
    );
  }
}