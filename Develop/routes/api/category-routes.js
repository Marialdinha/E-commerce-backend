const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try{
    // find all categories
    // be sure to include its associated Products
    const categoryData = await Category.findAll(
      {include:[
        {model: Product}]
      });
      res.status(200).json(categoryData);
  }catch(err) {
    // Handle errors
    res.status(500).json(err);
  }
  });


router.get('/:id', async (req, res) => {
  try{
    // find one category by its `id` value
    // be sure to include its associated Products
    const categoryById = await Category.findByPk(
      req.params.id, {include:[{model: Product}
      ]
    });
    if (!categoryById) {
      res.status(404).json({message:"Category ID not found"});
      return
    }
    res.status(200).json(categoryById);
  }catch(err) {
    // Handle errors
    res.status(500).json(err);
  }
  });


router.post('/', async (req, res) => {
  // create a new category
  try{
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory);
  }catch(err) {
    // Handle errors
    res.status(400).json(err);
  }
  });


router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try{
    const updateCategory = await Category.update(
      req.body, {where: {id: req.params.id}});
    if (!updateCategory[0]) {
      res.status(404).json({ message: "category not found for update" });
      return;
    }
    res.status(200).json(updateCategory);
  } catch (err) {
    // Handle errors
    res.status(500).json(({messae: "not able to update category"}))
  }
});


router.delete('/:id', async (req, res) => {
  try {
      // delete a category by its `id` value
      const deleteCategory = await Category.destroy({where: {id:req.params.id}});
      if (!deleteCategory) {
        res.status(404).json({ message: "category not found for deletion" });
        return;
      }
      res.status(200).json({message:"category deleted"});
  } catch (err) {
    // Handle errors
    res.status(500).json((err));
}
});

module.exports = router;
