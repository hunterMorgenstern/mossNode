import { Playlist } from "./playlist.model";

const getPlaylist = (_, { id }) => {
  return Playlist.findById(id).exec();
};
const allPlaylists = () => {
  return Playlist.findById().exec();
};

export const playlistResolvers = {
  Query: {
    Playlist: getPlaylist,
    allPlaylists
  }
};
