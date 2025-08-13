export const crudFactory = (Model, uniqueKey) => ({
  list: async (req, res, next) => {
    try { res.json(await Model.find({}).lean()); } catch (e) { next(e); }
  },
  get: async (req, res, next) => {
    try {
      const doc = await Model.findById(req.params.id).lean();
      if (!doc) return res.status(404).json({ error: "Not found" });
      res.json(doc);
    } catch (e) { next(e); }
  },
  create: async (req, res, next) => {
    try {
      if (uniqueKey && await Model.findOne({ [uniqueKey]: req.body[uniqueKey] }))
        return res.status(409).json({ error: `${uniqueKey} exists` });
      const doc = await Model.create(req.body);
      res.status(201).json(doc);
    } catch (e) { next(e); }
  },
  update: async (req, res, next) => {
    try {
      const doc = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!doc) return res.status(404).json({ error: "Not found" });
      res.json(doc);
    } catch (e) { next(e); }
  },
  remove: async (req, res, next) => {
    try {
      const doc = await Model.findByIdAndDelete(req.params.id);
      if (!doc) return res.status(404).json({ error: "Not found" });
      res.json({ ok: true });
    } catch (e) { next(e); }
  }
});
