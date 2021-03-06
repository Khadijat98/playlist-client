import React, { useState } from 'react';
import SongTile from '../SongTile/SongTile';
import "./Playlist.scss";

const Playlist = (props) => {
  const {
    id,
    playlistTitle,
    playlistImgUrl,
    createdBy,
    playlistDescription,
    songID
  } = props.playlist

  const [songs, setSongs] = useState("");
  const songArray = [];
  const getSongs = () => {
    songID.trim().split(", ").map(song => {
      fetch(`http://localhost:8080/song/${song}`)
      .then(response => response.json())
      .then(songObject => {
        songArray.push(songObject)
      })
    })
  };

  const showSongs = () => {
   getSongs();
   setTimeout(() => {
     if (songArray.length > 0) {
       setSongs(songArray);
     } 
   }, 150)
  };

  const hideSongs = () => {
    setSongs(false);
    songArray.length = 0;
  };

  const handleDelete = () => {
    fetch(`http://localhost:8080/playlist/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then((response) => {
      response.json();
      window.location.reload();
    })
    .catch((err) => console.log(err));
  };

  return (
    <div className="playlist">
      <h3 className="playlist__title">{playlistTitle}</h3>
      <p className="playlist__author">By: {createdBy}</p>
      <img className="playlist__img" src={playlistImgUrl} alt="playlist icon" />
      <p className="playlist__description">{playlistDescription}</p>
      <div className="playlist__songs">
        {songs && <SongTile songs={songs} />}
      </div>
      <div className="playlist__button">
        <button className="playlist__button--show" onClick={showSongs}>Show Songs</button>
        <button className="playlist__button--hide" onClick={hideSongs}>Hide Songs</button>
      <button className="playlist__button--delete" onClick={() => {
        if (window.confirm("Are you sure you want to delete this playlist?")) {
          handleDelete()}
        }
      }> Delete Playlist</button>
      </div>
    </div>
  )
}

export default Playlist;
