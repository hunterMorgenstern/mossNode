import merge from "lodash.merge";

const testData = { message: "hello" };

// These are generic methods used in the generic controllers for all models
export const controllers = {
  createOne(model, body) {
    return model.create(body);
  },

  updateOne(docToUpdate, update) {
    return docToUpdate.set(update).save();
  },

  deleteOne(docToDelete) {
    return docToDelete.remove();
  },

  getOne(docToGet) {
    return Promise.resolve(docToGet);
  },

  getAll(model) {
    return model.find({}).exec();
  },

  findByParam(model, id) {
    return model.findById(id).exec();
  }
};

export const createOne = model => (req, res, next) =>
  controllers
    .createOne(model, req.body)
    .then(doc => res.status(201).json(doc))
    .catch(e => next(e));

export const updateOne = model => async (req, res, next) => {
  const docToUpdate = req.docFromId;
  const update = req.body;
  return controllers
    .updateOne(docToUpdate, update)
    .then(doc => res.status(201).json(doc))
    .catch(e => next(e));
};

export const deleteOne = model => (req, res, next) =>
  controllers
    .deleteOne(req.docFromId)
    .then(doc => res.status(201).json(doc))
    .catch(e => next(e));

export const getOne = model => (req, res, next) =>
  controllers
    .getOne(req.docFromId)
    .then(doc => res.status(200).json(doc))
    .catch(e => next(e));

export const getAll = model => (req, res, next) =>
  controllers
    .getAll(model)
    .then(docs => res.json(docs))
    .catch(e => next(e));

export const findByParam = model => (req, res, next, id) =>
  controllers
    .findByParam(model, id)
    .then(doc => {
      if (!doc) {
        next(new Error("Not Found Error"));
      } else {
        req.docFromId = doc;
        next();
      }
    })
    .catch(e => {
      next(e);
    });

export const generateControllers = (model, overrides = {}) => {
  const defaults = {
    findByParam: findByParam(model),
    getAll: getAll(model),
    getOne: getOne(model),
    deleteOne: deleteOne(model),
    updateOne: updateOne(model),
    createOne: createOne(model)
  };

  return { ...defaults, ...overrides };
};
