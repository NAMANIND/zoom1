const router = require("express").Router();

router.get("/", (req, res) => {
  res.render('main');
});

router.get('/:room', (req, res) => {
  res.status(200).render('room', { roomId: req.params.room })
})

module.exports = router;