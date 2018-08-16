import merge from "lodash.merge";
import { Song } from "./song.model";
import { User } from "../user/user.model";

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
  const { id, ...update } = input;
  return Song.findByIdAndUpdate(id, update, { new: true }).exec();
};

const createSong = (_, { input }) => {
  return Song.create(input);
};

const removeSong = (_, { id }) => {
  return Song.findByIdAndRemove(id).exec();
};

export const songResolvers = {
  Query: {
    Song: getOneSong,
    allSongs
  },
  Mutation: {
    updateSong,
    createSong,
    removeSong
  }
};
