const routes = require("express").Router();
const ProductController = require("../controllers/ProductController");
const { isAdmin } = require("../middlewares/authorize");
// const uploadToGCP = require('../middlewares/uploadToGCP')
const Authentication = require("../middlewares/authenticate");

routes.get("/", ProductController.list);
routes.get("/search", ProductController.search);
routes.get("/category", ProductController.findByCategory);
routes.get("/:id", ProductController.findOne);

routes.use(Authentication);

// routes.post('/', isAdmin, uploadToGCP.multer.single('picture_url'), uploadToGCP.sendUploadToGCS,ProductController.create)
// routes.put('/:id', isAdmin, ProductController.findOneAndNext, uploadToGCP.multer.single('picture_url'), uploadToGCP.deleteImage, uploadToGCP.sendUploadToGCS, ProductController.update)
// routes.delete('/:id', isAdmin, ProductController.findOneAndNext, uploadToGCP.deleteImage, ProductController.delete)

module.exports = routes;
