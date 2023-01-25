const Coffee = require("../models/Coffee");

const CoffeeController = () => {
  const find = async (req, res) => {
    try {
      // setup pagination
      const { page = 1, limit = 10 } = req.query;
      const offset = (page - 1) * limit;

      const data = await Coffee.findAndCountAll({
        limit: parseInt(limit),
        offset: parseInt(offset),
      });

      return res.status(200).json({
        data: data.rows,
        total: data.count,
        page: parseInt(page),
        limit: parseInt(limit),
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: "Internal server error" });
    }
  };

  const findById = async (req, res) => {
    try {
      const { id } = req.params;
      const data = await Coffee.findOne({
        where: {
          id,
        },
      });

      return res.status(200).json({
        data,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: "Internal server error" });
    }
  };

  const store = async (req, res) => {
    try {
      const { name, description, image, price } = req.body;
      const data = await Coffee.create({
        name,
        description,
        image,
        price,
      });

      return res.status(200).json({
        messages: "success",
        data,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: "Internal server error" });
    }
  };

  const update = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, description, image, price } = req.body;
      const data = await Coffee.update(
        {
          name,
          description,
          image,
          price,
        },
        {
          where: {
            id,
          },
        }
      );

      return res.status(200).json({
        messages: "success",
        data,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: "Internal server error" });
    }
  };

  const destroy = async (req, res) => {
    try {
      const { id } = req.params;
      const data = await Coffee.destroy({
        where: {
          id,
        },
      });

      return res.status(200).json({
        messages: "success",
        data,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: "Internal server error" });
    }
  };

  return {
    find,
    findById,
    store,
    update,
    destroy,
  };
};

module.exports = CoffeeController;
