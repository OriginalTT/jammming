import React from "react";
import "./Track.css";


export class Track extends React.Component {
    constructor(props) {
        super(props);
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        this.getArtist = this.getArtist.bind(this);
        this.getAlbum = this.getAlbum.bind(this);
    }

    renderAction() {
        if (this.props.isRemoval) {
            return <button className="Track-action" onClick={this.removeTrack} >-</button>
        } else {
            return <button className="Track-action" onClick={this.addTrack} >+</button>
        }
    }

    addTrack() {
        this.props.onAdd(this.props.track);
    }

    removeTrack() {
        this.props.onRemove(this.props.track);
    }

    checkLength(str) {
        if(str.length >= 25) {
            return str.slice(0, 25) + "...";
        } else {
            return str;
        }
    }

    getArtist() {
        this.props.onGetArtist(this.props.track.artistID);
    }

    getAlbum() {
        this.props.onGetAlbum(this.props.track.albumID, this.props.track.album, this.props.track.cover);
    }

    render() {
        return (
            <div className="Track">
                <div className="Track-information">
                    <img src={this.props.track.cover} onClick={this.getAlbum} />
                    <div>
                        <h3>{this.props.track.name}</h3>
                        <p><button onClick={this.getArtist}>{this.checkLength(this.props.track.artist)}</button> | <button onClick={this.getAlbum}>{this.checkLength(this.props.track.album)}</button></p>
                    </div>
                </div>
                {this.renderAction()}
            </div>
        )
    }
}