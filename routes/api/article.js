const router = require("express").Router();
const articleController = require("../../controllers/articleController");

// Matches with "/api/article"
// router.route("/")
//   .get(articleController.findAll)
router.route('/api/article')
  .post(articleController.create);

// Matches with "/api/article/:id"
// router
//   .route("/:id")
//   .get(articleController.findById)
//   .put(articleController.update)
//   .delete(articleController.remove);

module.exports = router;
