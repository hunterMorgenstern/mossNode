import merge from "lodash.merge";
import { Song } from "./song.model";

const getOneSong = async (_, { id }) => {
  const song = await Song.findById(id).exec();

  if (!song) {
    throw new Error("Cannot find song with id");
  }

  return song;
};

const allSongs = () => {
  return Song.find({}).exec();
};

const updateSong = (_, { input }) => {
  const song = {}; // grab song from db and convert to obj
  merge(input, song);
  return song.save();
};

export const songResolvers = {
  Query: {
    Song: getOneSong,
    allSongs
  },
  Mutation: {
    updateSong,
    createSong
  }
};
