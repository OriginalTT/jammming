const clientID = "ENTER YOUR ID";
const redirectUri = 'ENTER YOUR REDIRECT URI';
let accessToken;

const Spotify = {
    getAccessToken() {
        if (accessToken) {
            return accessToken;
        }

        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

        if (accessTokenMatch && expiresInMatch) {
            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        } else {
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`
            window.location = accessUrl;
        }
    },

    search(term) {
        const accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then(response => {
            return response.json();
        }).then(jsonResponse => {
            if (!jsonResponse.tracks) {
                return [];
            }
            return jsonResponse.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                artistID: track.artists[0].id,
                album: track.album.name,
                albumID: track.album.id,
                uri: track.uri,
                cover: track.album.images[0].url
            }));
        });
    },

    getArtist(id) {
        const accessToken = Spotify.getAccessToken();
        const headers = { Authorization: `Bearer ${accessToken}` };

        return fetch(`https://api.spotify.com/v1/artists/${id}/top-tracks?market=JP`, { headers: headers }
        ).then(response => {
            return response.json();
        }).then(jsonResponse => {
            if (!jsonResponse.tracks) {
                return [];
            }
            return jsonResponse.tracks.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                artistID: track.artists[0].id,
                album: track.album.name,
                albumID: track.album.id,
                uri: track.uri,
                cover: track.album.images[0].url
            }));
        });
    },

    getAlbum(id, name, imgSource) {
        const accessToken = Spotify.getAccessToken();
        const headers = { Authorization: `Bearer ${accessToken}` };
        
        return fetch(`https://api.spotify.com/v1/albums/${id}/tracks?market=JP`, {headers: headers}
        ).then(response => {
            return response.json();
        }).then(jsonResponse => {
            if (!jsonResponse.items) {
                return [];
            }
            return jsonResponse.items.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                artistID: track.artists[0].id,
                album: name,
                albumID: id,
                uri: track.uri,
                cover: imgSource              
            }));
        });
    },

    savePlaylist(name, trackUris) {
        if (!name || !trackUris.length) {
            return;
        }

        const accessToken = Spotify.getAccessToken();
        const headers = { Authorization: `Bearer ${accessToken}` };
        let userID;

        return fetch("https://api.spotify.com/v1/me", { headers: headers }
        ).then(response => response.json()
        ).then(jsonResponse => {
            userID = jsonResponse.id;
            return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`,
                {
                    headers: headers,
                    method: 'POST',
                    body: JSON.stringify({ name: name })
                })
        }).then(response => response.json()
        ).then(jsonResponse => {
            const playlistID = jsonResponse.id;
            return fetch(`https://api.spotify.com/v1/users/{user_id}/playlists/${playlistID}/tracks`, {
                headers: headers,
                method: "POST",
                body: JSON.stringify({ uris: trackUris })
            })
        })
    }
}

export default Spotify;