const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Patient = require("../models/Patient");

router.get("/", (req, res, next) => {
  Patient.find()
    .exec()
    .then(docs => {
      console.log(docs);
      //   if (docs.length >= 0) 
      res.status(200).json(docs);
      //   } else {
      //       res.status(404).json({
      //           message: 'No entries found'
      //       });
      //   }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

app.post('/',(req, res, next) => {

    const Patient = new Patient({
      _id: new mongoose.Types.ObjectId(),
      PatientID : req.body.PatientID ,
      Firstname : req.body.Firstname ,
      Lastname : req.body.Lastname
    })
  
    Patient.save().then( result => {
      console.log(result);
      res.status(201).json({
        message: "Handling POST requests to /products",
        createdProduct: result
      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      })
    })
})

router.get("/:Id", (req, res, next) => {
  const id = req.params.Id;
  PatientInfo.findById(id)
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json(doc);
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});
/*
router.patch("/:productId", (req, res, next) => {
  const id = req.params.productId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Product.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.delete("/:productId", (req, res, next) => {
  const id = req.params.productId;
  Product.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});
*/
module.exports = router