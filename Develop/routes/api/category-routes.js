const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try{
    // find all categories
    // be sure to include its associated Products
    const categoryData = await Category.findAll({include:[{model: Product}]});
      res.status(200).json(categoryData);
  }catch(err) {
    // Handle errors
    res.status(500).json({message:"Categories not found"});
  }
  });


router.get('/:id', async (req, res) => {
  try{
    // find one category by its `id` value
    // be sure to include its associated Products
    const categoryById = await Category.findByPk(req.params.id, {include:[{model: Product}]});

    if (!categoryById) {
      res.status(404).json({message:"Category ID not found"});
    }
    res.status(200).json(categoryById);
  }catch(err) {
    // Handle errors
    res.status(500).json({message:`Category ID not found`});
  }
  });


router.post('/', async (req, res) => {
  // create a new category
  try{
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory);
  }catch(err) {
    // Handle errors
    res.status(400).json({message:`new category failed`});
  }
  });


router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try{
    const updateCategory = await Category.update(req.body, {where: {id: req.params.id}});
    !updateCategory[0] ? res.status(404).json({message: "category not found for update"}) : res.status(200).json(updateCategory);
  } catch (err) {
    // Handle errors
    res.status(500).json(({messae: "not able to update category"}))
  }
});


router.delete('/:id', async (req, res) => {
  try {
      // delete a category by its `id` value
      const deleteCategory = await Category.destroy({where: {id:req.params.id}});
    !deleteCategory ? res.status(404).json({message:"category not found for deletion"}) : res.status(200).json(deleteCategory);
  } catch (err) {
    // Handle errors
    res.status(500).json(({messae: "not able to delete category"}));
}
});

module.exports = router;
