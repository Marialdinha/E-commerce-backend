const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', async (req, res) => {
  try{
  // find all products
  // be sure to include its associated Category and Tag data
  const productsData = await Product.findAll(
    {include:[
      {model: Category}, {model: Tag}]
    });
  res.status(200).json(productsData);                 
  }catch(err){
   // Handle errors
  res.status(500).json(err)
  }
});

// get one product
router.get('/:id', async (req, res) => {
  try{
  // find a single product by its `id`
  // be sure to include its associated Category and Tag data
  const productByID = await Product.findByPk(
    req.params.id, {include:[
      {model: Category}, {model: Tag}
    ]
  });
  if (!productByID) {
      res.status(404).json({message:"Product ID not found"});
      return
  }
  res.status(200).json(productByID);   
  }catch (err){
    // Handle errors
    res.status(500).json(err);
  } 
});

router.post('/', async (req, res) => {
  try{
  // create new product
  const newProduct =  await Product.create(req.body);
  // if there are tags for the product, create the product/tag record
  if (req.body.tagIds.length){
  for (let i = 0; i < req.body.tagIds.length; i++) {
    await ProductTag.create({
    product_id: newProduct.id,
    tag_id: req.body.tagIds[i] });
  }
}
res.status(200).json(newProduct);
  } catch(err){
    // Handle errors
    return res.status(500).json(err);
  }
});

// update product
router.put('/:id', async (req, res) => {
  try{
    const updateProduct = await Product.update(
      req.body, {where: {id: req.params.id}});
      const deleteProdTag = await ProductTag.destroy({where: {product_id: req.params.id}});
      if (req.body.tagIds && req.body.tagIds.length){
      for (let i = 0; i < req.body.tagIds.length; i++) {
        await ProductTag.create({
        product_id: req.params.id,
        tag_id: req.body.tagIds[i] });
    }
  }
    res.status(200).json(updateProduct);
  } catch (err) {
    // Handle errors
    res.status(500).json(({messae: "not able to update product"}))
  }

});


router.delete('/:id', async (req, res) => {
  // delete one product by its `id` value
  try{
    const deleteProduct = await Product.destroy({where: {id:req.params.id}});
   if (!deleteProduct) {
      res.status(404).json({ message: "Product not found for deletion" });
      return;
    }
    res.status(200).json({message:"Product deleted"});
  }catch{
  // Handle errors
  res.status(500).json(({message: "not able to delete Product"}));
  }

});

module.exports = router;
