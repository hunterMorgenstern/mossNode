import { Playlist } from "./playlist.model";
import { Song } from "../song/song.model";

const getPlaylist = (_, { id }) => {
  return Playlist.findById(id).exec();
};
const allPlaylists = () => {
  return Playlist.findById().exec();
};

const updatePlaylist = (_, { input }) => {
  const { id, ...update } = input;
  return Playlist.findByIdAndUpdate(id, update, { new: true }).exec();
};

const createPlaylist = (_, { input }) => {
  return Playlist.create(input);
};

export const playlistResolvers = {
  Query: {
    Playlist: getPlaylist,
    allPlaylists
  },
  Mutation: {
    updatePlaylist,
    createPlaylist
  },

  Playlist: {
    async songs(playlist) {
      const populated = await playlist.populate("songs").execPopulate();

      return populated.songs;
    }
  }
};
