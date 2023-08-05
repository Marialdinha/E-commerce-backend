const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try{
 // find all tags
 // be sure to include its associated Product data
  const tagsData = await Tag.findAll({include:[{model: ProductTag}, {model: Product}]});
  res.status(200).json(tagsData);                 
  }catch{
   // Handle errors
  res.status(500).json({message: "Tags not found"})
  }
});


router.get('/:id', async (req, res) => {
  try{
 // find a single tag by its `id`
 // be sure to include its associated Product data
  const tagsByID = await Tag.findByPk(req.params.id,{include:[{model: ProductTag}, {model: Product}]});
  if (!tagsByID) {
    res.status(404).json({message:"Tag ID not found"});
  }
  res.status(200).json(tagsByID);                 
  }catch{
   // Handle errors
  res.status(500).json({message: "Tags not found"})
  }
});


router.post('/', async (req, res) => {
  // create a new tag
  try{
    const newTag = await Tag.create(req.body);
    res.status(200).json(newTag);
  }catch(err) {
    // Handle errors
    res.status(400).json({message:"new tag failed"});
  }
  });


router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try{
    const updateTag = await Tag.update(req.body, {where: {id: req.params.id}});
    !updateTag[0] ? res.status(404).json({message: "tag not found for update"}) : res.status(200).json(updateTag);
  } catch (err) {
    // Handle errors
    res.status(500).json(({message: "not able to update tag"}))
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try{
    const deleteTag = await Tag.destroy({where: {id:req.params.id}});
    !deleteTag ? res.status(404).json({message:"Tag not found for deletion"}) : res.status(200).json(deleteTag);
  }catch{
  // Handle errors
  res.status(500).json(({messae: "not able to delete Tag"}));
  }

});


module.exports = router;
