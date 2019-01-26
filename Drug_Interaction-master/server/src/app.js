const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const axios = require('axios')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

app.get('/post', (req, res) => {
  res.send(
    [{
      title: "Hello World!",
      description: "Hi there! How are you?"
    }]
  )
})

app.listen(process.env.PORT || 8081)

var mongoose = require('mongoose');
mongoose.connect('mongodb://Win:winwin@cluster0-shard-00-00-koz3g.mongodb.net:27017,cluster0-shard-00-01-koz3g.mongodb.net:27017,cluster0-shard-00-02-koz3g.mongodb.net:27017/DrugInteraction?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true');
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function (callback) {
  console.log("Connection Succeeded");
});

var PatientInfo = require("../models/Patient")
var DoctorInfo = require("../models/Doctor")
var PharmacistInfo = require("../models/Pharmacist");
var AllergicDrug = require("../models/AllergicDrug")
var Account = require("../models/Account")
var AccountRelation = require("../models/AccountRelation")

// PatientInfo
// Fetch single post
app.get("/PatientInfo/:Id", (req, res) => {
  console.log('GET method')
  const id = req.params.Id;
  PatientInfo.find({
      "PatientID": id
    })
    .exec()
    .then(doc => {
      console.log(id);
      console.log("From database", doc);
      if (doc) {
        res.status(200).json(doc);
      } else {
        res
          .status(404)
          .json({
            message: "No valid entry found for provided ID"
          });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });

});


// Fetch all posts
app.get("/PatientInfo", (req, res, next) => {
  console.log('GET method')
  PatientInfo.find()
    .exec()
    .then(docs => {
      console.log(docs);
      if (docs.length >= 0) {
        res.status(200).json(docs);
      } else {
        res.status(404).json({
          message: 'No entries found'
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

app.post('/post/PatientInfo', (req, res) => {
  var db = req.db;
  var PatientID = req.body.PatientID
  var Prefix = req.body.Prefix
  var Firstname = req.body.Firstname
  var Lastname = req.body.Lastname
  var Sex = req.body.Sex
  var DOB = req.body.DOB
  var Age = req.body.Age
  var Email = req.body.Email
  var Weight = req.body.Weight
  var Height = req.body.Height
  var IDcardNumber = req.body.IDcardNumber
  var Status = req.body.Status
  var Race = req.body.Race
  var Nation = req.body.Nation
  var Religion = req.body.Religion
  var Bloodgroup = req.body.Bloodgroup
  var Address = req.body.Address
  var Phone = req.body.Phone
  PatientInfo.find()
    .exec()
    .then(docs => {
      if (docs.length > 0) {
        var x = docs[docs.length - 1].PatientID.split('P')

        PatientID = parseInt(x[1]) + 1
        PatientID = PatientID.toString()
        if (PatientID.length == 1) PatientID = "P0000" + PatientID
        else if (PatientID.length == 2) PatientID = "P000" + PatientID
        else if (PatientID.length == 3) PatientID = "P00" + PatientID
        else if (PatientID.length == 4) PatientID = "P0" + PatientID
        else PatientID = "P" + PatientID

        var new_Patient = new PatientInfo({
          PatientID: PatientID,
          Prefix: Prefix,
          Firstname: Firstname,
          Lastname: Lastname,
          Sex: Sex,
          DOB: DOB,
          Age: Age,
          Email: Email,
          Weight: Weight,
          Height: Height,
          IDcardNumber: IDcardNumber,
          Status: Status,
          Race: Race,
          Nation: Nation,
          Religion: Religion,
          Bloodgroup: Bloodgroup,
          Address: Address,
          Phone: Phone
        })
        new_Patient.save(function (error) {
          if (error) {
            console.log(error)
          }
          res.status(200).json(new_Patient)
        })
      } else {
        PatientID = "P00000"
        var new_Patient = new PatientInfo({
          PatientID: PatientID,
          Prefix: Prefix,
          Firstname: Firstname,
          Lastname: Lastname,
          Sex: Sex,
          DOB: DOB,
          Age: Age,
          Email: Email,
          Weight: Weight,
          Height: Height,
          IDcardNumber: IDcardNumber,
          Status: Status,
          Race: Race,
          Nation: Nation,
          Religion: Religion,
          Bloodgroup: Bloodgroup,
          Address: Address,
          Phone: Phone
        })
        new_Patient.save(function (error) {
          if (error) {
            console.log(error)
          }
          res.status(200).json(new_Patient)
        })
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });


})

app.put("/update/PatientInfo/:Id", (req, res, next) => {
  console.log("POST Method")
  var id = req.params.Id
  PatientInfo.findOne({
    _id: id
  }, function (err, foundObject) {
    if (err) {
      console.log(err)
      res.status(500).send()
    } else {
      if (!foundObject) {
        res.status(404).send()
      } else {
        if (req.body.PatientID) {
          foundObject.PatientID = req.body.PatientID
        }
        if (req.body.Prefix) {
          foundObject.Prefix = req.body.Prefix
        }
        if (req.body.Firstname) {
          foundObject.Firstname = req.body.Firstname
        }
        if (req.body.Lastname) {
          foundObject.Lastname = req.body.Lastname
        }
        if (req.body.Sex) {
          foundObject.Sex = req.body.Sex
        }
        if (req.body.DOB) {
          foundObject.DOB = req.body.DOB
        }
        if (req.body.Age) {
          foundObject.Age = req.body.Age
        }
        if (req.body.Email) {
          foundObject.Email = req.body.Email
        }
        if (req.body.Weight) {
          foundObject.Weight = req.body.Weight
        }
        if (req.body.Height) {
          foundObject.Height = req.body.Height
        }
        if (req.body.IDcardNumber) {
          foundObject.IDcardNumber = req.body.IDcardNumber
        }
        if (req.body.Status) {
          foundObject.Status = req.body.Status
        }
        if (req.body.Race) {
          foundObject.Race = req.body.Race
        }
        if (req.body.Nation) {
          foundObject.Nation = req.body.Nation
        }
        if (req.body.Religion) {
          foundObject.Religion = req.body.Religion
        }
        if (req.body.Bloodgroup) {
          foundObject.Bloodgroup = req.body.Bloodgroup
        }
        if (req.body.Address) {
          foundObject.Address = req.body.Address
        }
        if (req.body.Phone) {
          foundObject.Phone = req.body.Phone
        }

        foundObject.save(function (err, updateObject) {
          if (err) {
            console.log(err)
            res.status(500).send();
          } else {
            res.send(updateObject)
          }
        })
      }
    }
  })
})

// Delete a post
app.delete('/remove/PatientInfo/:id', (req, res) => {
  var db = req.db;
  PatientInfo.remove({
    _id: req.params.id
  }, function (err, post) {
    if (err)
      res.send(err)
    res.send({
      success: true
    })
  })
})

// DoctorInfo
// Fetch single post
app.get("/DoctorInfo/:Id", (req, res) => {
  console.log('GET method')
  const id = req.params.Id;
  DoctorInfo.find({
      "_id": id
    })
    .exec()
    .then(doc => {
      console.log("Doctorid :" + id);
      console.log("From database", doc);
      if (doc) {
        res.status(200).json(doc);
      } else {
        res
          .status(404)
          .json({
            message: "No valid entry found for provided ID"
          });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });

});

// Fetch all posts
app.get("/DoctorInfo", (req, res, next) => {
  console.log('GET method')
  DoctorInfo.find()
    .exec()
    .then(docs => {
      console.log(docs);
      if (docs.length >= 0) {
        res.status(200).json(docs);
      } else {
        res.status(404).json({
          message: 'No entries found'
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

app.post('/post/DoctorInfo', (req, res) => {
  var db = req.db;
  var DoctorID = req.body.DoctorID
  var Prefix = req.body.Prefix
  var Firstname = req.body.Firstname
  var Lastname = req.body.Lastname
  var Sex = req.body.Sex
  var Email = req.body.Email
  var IDcardNumber = req.body.IDcardNumber
  var Ward = req.body.ward
  var Department = req.body.Department
  var Address = req.body.Address
  var Phone = req.body.Phone
  
  DoctorInfo.find()
    .exec()
    .then(docs => {
      if (docs.length > 0) {
        var x = docs[docs.length - 1].DoctorID.split('D')

        DoctorID = parseInt(x[1]) + 1
        DoctorID = DoctorID.toString()
        if (DoctorID.length == 1) DoctorID = "D0000" + DoctorID
        else if (DoctorID.length == 2) DoctorID = "D000" + DoctorID
        else if (DoctorID.length == 3) DoctorID = "D00" + DoctorID
        else if (DoctorID.length == 4) DoctorID = "D0" + DoctorID
        else DoctorID = "D" + DoctorID

        var new_Doctor = new DoctorInfo({
          DoctorID: DoctorID,
          Prefix: Prefix,
          Firstname: Firstname,
          Lastname: Lastname,
          Email: Email,
          Department: Department,
          Ward: Ward,
          Sex: Sex,
          IDcardNumber: IDcardNumber,
          Address: Address,
          Phone: Phone
        })
        new_Doctor.save(function (error) {
          if (error) {
            console.log(error)
          }
          res.status(200).json(new_Doctor)
        })
      } else {
        DoctorID = "D00000"

        var new_Doctor = new DoctorInfo({
          DoctorID: DoctorID,
          Prefix: Prefix,
          Firstname: Firstname,
          Lastname: Lastname,
          Email: Email,
          Department: Department,
          Ward: Ward,
          Sex: Sex,
          IDcardNumber: IDcardNumber,
          Address: Address,
          Phone: Phone
        })
        new_Doctor.save(function (error) {
          if (error) {
            console.log(error)
          }
          res.status(200).json(new_Doctor)
        })
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
})

app.put("/update/DoctorInfo/:Id", (req, res, next) => {
  console.log("POST Method")
  var id = req.params.Id
  DoctorInfo.findOne({
    _id: id
  }, function (err, foundObject) {
    if (err) {
      console.log(err)
      res.status(500).send()
    } else {
      if (!foundObject) {
        res.status(404).send()
      } else {
        if (req.body.DoctorID) {
          foundObject.DoctorID = req.body.DoctorID
        }
        if (req.body.Prefix) {
          foundObject.Prefix = req.body.Prefix
        }
        if (req.body.Firstname) {
          foundObject.Firstname = req.body.Firstname
        }
        if (req.body.Lastname) {
          foundObject.Lastname = req.body.Lastname
        }
        if (req.body.Ward) {
          foundObject.Ward = req.body.Ward
        }
        if (req.body.Department) {
          foundObject.Department = req.body.Department
        }
        if (req.body.Sex) {
          foundObject.Sex = req.body.Sex
        }
        if (req.body.Email) {
          foundObject.Email = req.body.Email
        }
        if (req.body.IDcardNumber) {
          foundObject.IDcardNumber = req.body.IDcardNumber
        }
        if (req.body.Address) {
          foundObject.Address = req.body.Address
        }
        if (req.body.Phone) {
          foundObject.Phone = req.body.Phone
        }

        foundObject.save(function (err, updateObject) {
          if (err) {
            console.log(err)
            res.status(500).send();
          } else {
            res.send({
              success: true,
              message: 'Update successfully!'
            })
          }
        })
      }
    }
  })
})

// Delete a post
app.delete('/remove/DoctorInfo/:id', (req, res) => {
  var db = req.db;
  DoctorInfo.remove({
    _id: req.params.id
  }, function (err, post) {
    if (err)
      res.send(err)
    res.send({
      success: true
    })
  })
})



// PharmacistInfo
// Fetch single post
app.get("/PharmacistInfo/:Id", (req, res) => {
  console.log('GET method')
  const id = req.params.Id;
  PharmacistInfo.find({
      "_id": id
    })
    .exec()
    .then(doc => {
      console.log("Pharmacistid :" + id);
      console.log("From database", doc);
      if (doc) {
        res.status(200).json(doc);
      } else {
        res
          .status(404)
          .json({
            message: "No valid entry found for provided ID"
          });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });

});

// Fetch all posts
app.get("/PharmacistInfo", (req, res, next) => {
  console.log('GET method')
  PharmacistInfo.find()
    .exec()
    .then(docs => {
      console.log(docs);
      if (docs.length >= 0) {
        res.status(200).json(docs);
      } else {
        res.status(404).json({
          message: 'No entries found'
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

app.post('/post/PharmacistInfo', (req, res) => {
  var db = req.db;
  var PharmacistID = req.body.PharmacistID
  var Prefix = req.body.Prefix
  var Firstname = req.body.Firstname
  var Lastname = req.body.Lastname
  var Sex = req.body.Sex
  var Email = req.body.Email
  var IDcardNumber = req.body.IDcardNumber
  var Department = req.body.Department
  var Address = req.body.Address
  var Phone = req.body.Phone

  
  PharmacistInfo.find()
    .exec()
    .then(docs => {
      if (docs.length > 0) {
        var x = docs[docs.length - 1].PharmacistID.split('PH')

        PharmacistID = parseInt(x[1]) + 1
        PharmacistID = PharmacistID.toString()
        if (PharmacistID.length == 1) PharmacistID = "PH0000" + PharmacistID
        else if (PharmacistID.length == 2) PharmacistID = "PH000" + PharmacistID
        else if (PharmacistID.length == 3) PharmacistID = "PH00" + PharmacistID
        else if (PharmacistID.length == 4) PharmacistID = "PH0" + PharmacistID
        else PharmacistID = "PH" + PharmacistID

        var new_Pharmacist = new PharmacistInfo({
          PharmacistID: PharmacistID,
          Prefix: Prefix,
          Firstname: Firstname,
          Lastname: Lastname,
          Email: Email,
          Department: Department,
          Sex: Sex,
          IDcardNumber: IDcardNumber,
          Address: Address,
          Phone: Phone
        })
        new_Pharmacist.save(function (error) {
          if (error) {
            console.log(error)
          }
          res.status(200).json(new_Pharmacist)
        })
      } else {
        PharmacistID = "PH00000"

        var new_Pharmacist = new PharmacistInfo({
          PharmacistID: PharmacistID,
          Prefix: Prefix,
          Firstname: Firstname,
          Lastname: Lastname,
          Email: Email,
          Department: Department,
          Sex: Sex,
          IDcardNumber: IDcardNumber,
          Address: Address,
          Phone: Phone
        })
        new_Pharmacist.save(function (error) {
          if (error) {
            console.log(error)
          }
          res.status(200).json(new_Pharmacist)
        })
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
})

app.put("/update/PharmacistInfo/:Id", (req, res, next) => {
  console.log("POST Method")
  var id = req.params.Id
  PharmacistInfo.findOne({
    _id: id
  }, function (err, foundObject) {
    if (err) {
      console.log(err)
      res.status(500).send()
    } else {
      if (!foundObject) {
        res.status(404).send()
      } else {
        if (req.body.PharmacistID) {
          foundObject.PharmacistID = req.body.PharmacistID
        }
        if (req.body.Prefix) {
          foundObject.Prefix = req.body.Prefix
        }
        if (req.body.Firstname) {
          foundObject.Firstname = req.body.Firstname
        }
        if (req.body.Lastname) {
          foundObject.Lastname = req.body.Lastname
        }
        if (req.body.Ward) {
          foundObject.Ward = req.body.Ward
        }
        if (req.body.Department) {
          foundObject.Department = req.body.Department
        }
        if (req.body.Sex) {
          foundObject.Sex = req.body.Sex
        }
        if (req.body.Email) {
          foundObject.Email = req.body.Email
        }
        if (req.body.IDcardNumber) {
          foundObject.IDcardNumber = req.body.IDcardNumber
        }
        if (req.body.Address) {
          foundObject.Address = req.body.Address
        }
        if (req.body.Phone) {
          foundObject.Phone = req.body.Phone
        }

        foundObject.save(function (err, updateObject) {
          if (err) {
            console.log(err)
            res.status(500).send();
          } else {
            res.send({
              success: true,
              message: 'Update successfully!'
            })
          }
        })
      }
    }
  })
})

// Delete a post
app.delete('/remove/PharmacistInfo/:id', (req, res) => {
  var db = req.db;
  PharmacistInfo.remove({
    _id: req.params.id
  }, function (err, post) {
    if (err)
      res.send(err)
    res.send({
      success: true
    })
  })
})


// AllergicDrug 
// Get list of Allergic Drug for 1 Patient By PatientID
app.get("/AllergicDrug/:PatientID", (req, res) => {
  console.log('GET method')
  const PatientID = req.params.PatientID;
  AllergicDrug.find({
      "PatientID": PatientID
    })
    .exec()
    .then(doc => {
      console.log("PatientID :" + PatientID);
      console.log("From database", doc);
      if (doc) {
        res.status(200).json(doc);
      } else {
        res
          .status(404)
          .json({
            message: "No valid entry found for provided ID"
          });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });

});

// ADD AllergicDrug
app.post('/post/AllergicDrug', (req, res) => {
  var db = req.db;
  var PatientID = req.body.PatientID
  var GPName = req.body.GPName
  var RXCUI = req.body.RXCUI
  //var GPID = req.body.GPID

  console.log("POST Method")
  var new_AllergicDrug = new AllergicDrug({
    PatientID: PatientID,
    GPName: GPName,
    //GPIP: GPID,
    RXCUI: RXCUI
  })
  new_AllergicDrug.save(function (error) {
    if (error) {
      console.log(error)
    }
    res.send({
      success: true,
      message: 'Post saved successfully!'
    })
  })
})

// Delete AllergicDrug By PatientID and GPName 
app.delete('/remove/AllergicDrug/:PatientID/:GPName', (req, res) => {
  var db = req.db;
  var PatientID = req.params.PatientID
  var GPName = req.params.GPName

  AllergicDrug.remove({
    "PatientID": PatientID,
    "GPName": GPName
  }, function (err, post) {
    if (err)
      res.send(err)
    res.send({
      success: true
    })
  })
})

// AccountRelation
// Get friend list of Patient By PatientID
app.get("/AccountRelation/Patient/:PatientID", (req, res) => {
  console.log('GET method')
  const PatientID = req.params.PatientID;
  AccountRelation.find({
      "PatientID": PatientID
    })
    .exec()
    .then(doc => {
      console.log("PatientID :" + PatientID);
      console.log("From database", doc);
      if (doc) {
        res.status(200).json(doc);
      } else {
        res
          .status(404)
          .json({
            message: "No valid entry found for provided ID"
          });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

// Get friend list of Patient By DoctorID
app.get("/AccountRelation/Doctor/:DoctorID", (req, res) => {
  console.log('GET method')
  const DoctorID = req.params.DoctorID;
  AccountRelation.find({
      "DoctorID": DoctorID
    })
    .exec()
    .then(doc => {
      console.log("DoctorID :" + DoctorID);
      console.log("From database", doc);
      if (doc) {
        res.status(200).json(doc);
      } else {
        res
          .status(404)
          .json({
            message: "No valid entry found for provided ID"
          });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

// ADD Relation between Account and Check ralation had already or not?
app.post('/post/AccountRelation', (req, res) => {
  var db = req.db;
  var PatientID = req.body.PatientID
  var DoctorID = req.body.DoctorID
  var DateTime = new Date();
  var DateNow = DateTime.toLocaleDateString();
  console.log(DateNow);
  var PatientReq = req.body.PatientReq
  var DoctorReq = req.body.DoctorReq

  function isEmptyObject(obj) {
    return !Object.keys(obj).length;
  }

  AccountRelation.find({
      "PatientID": PatientID,
      "DoctorID": DoctorID
    })
    .exec()
    .then(doc => {
      console.log(doc)

      if (isEmptyObject(doc)) {
        var new_AccountRelation = new AccountRelation({
          PatientID: PatientID,
          DoctorID: DoctorID,
          Date: DateNow,
          PatientReq: PatientReq,
          DoctorReq: DoctorReq,
        })
        new_AccountRelation.save(function (error) {
          if (error) {
            console.log(error)
          }
          res.status(200).send({
            success: true,
            message: 'Post saved successfully!'
          })
        })
      } else {
        res
          .status(404)
          .json({
            success: false,
            message: "This relation had already"
          })
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
})

// Accept Relation
app.put("/update/AccountRelation/:PatientID/:DoctorID", (req, res, next) => {
  console.log("POST Method")
  var PatientID = req.params.PatientID
  var DoctorID = req.params.DoctorID
  AccountRelation.findOne({
    "PatientID": PatientID,
    "DoctorID": DoctorID
  }, function (err, foundObject) {
    if (err) {
      console.log(err)
      res.status(500).send()
    } else {
      if (!foundObject) {
        res.status(404).send()
      } else {
        if (req.body.PatientReq) {
          foundObject.PatientReq = req.body.PatientReq
        }
        if (req.body.DoctorReq) {
          foundObject.DoctorReq = req.body.DoctorReq
        }
        foundObject.save(function (err, updateObject) {
          if (err) {
            console.log(err)
            res.status(500).send();
          } else {
            res.send({
              success: true,
              message: 'Update successfully!'
            })
          }
        })
      }
    }
  })
})

// Delete Relation By PatientID and DoctorID 
app.delete('/remove/AccountRelation/:PatientID/:DoctorID', (req, res) => {
  var db = req.db;
  var PatientID = req.params.PatientID
  var DoctorID = req.params.DoctorID

  AccountRelation.findOneAndRemove({
    "PatientID": PatientID,
    "DoctorID": DoctorID
  }, function (err, post) {
    if (err)
      res.send(err)
    res.send({
      success: true
    })
  })
})


// Account 
// Register (ADD an account)
app.post('/Register', (req, res) => {
  var ID = req.body.ID
  var Username = req.body.Username
  var Password = req.body.Password
  var Email = req.body.Email
  var AccountType = req.body.AccountType
  var RegisterStatus

  if (AccountType == 'Doctor') {
    RegisterStatus = '0'
  } else {
    RegisterStatus = '1'
  }

  function isEmptyObject(obj) {
    return !Object.keys(obj).length;
  }

  Account.find({
      "๊Username": Username
    })
    .exec()
    .then(doc => {
      console.log(doc)

      if (isEmptyObject(doc)) {

        Account.find({
            "Email": Email
          })
          .exec()
          .then(doc => {
            console.log(doc)
            if (isEmptyObject(doc)) {
              var new_Account = new Account({
                ID: ID,
                Username: Username,
                Password: Password,
                Email: Email,
                AccountType: AccountType,
                RegisterStatus: RegisterStatus
              })
              new_Account.save(function (error) {
                if (error) {
                  console.log(error)
                }
                res.status(200).send({
                  success: true,
                  message: 'Post saved successfully!'
                })
              })
            } else {
              res
                .status(404)
                .json({
                  success: false,
                  message: "Email had already"
                })
            }
          })
      } else {
        res
          .status(404)
          .json({
            success: false,
            message: "๊Username had already"
          })
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
})


// Login
app.post('/Login', (req, res) => {
  var Username = req.body.Username
  var Password = req.body.Password
  Account.findOne({
      'Username': Username,
      'Password': Password
    })
    .exec()
    .then(doc => {
      console.log(doc)

      if (doc) {
        if (doc.RegisterStatus == '0') {
          res
            .status(200)
            .json({
              success: false,
              message: "Account is not verified By Administrator"
            })
        } else {
          res
            .status(200)
            .json(doc)
        }
      } else {
        res
          .status(200)
          .json({
            success: false,
            message: "Username and/or Password incorrect"
          })
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
})

//  Change Username / Password vetify By Email
app.put("/update/Account/:Email", (req, res, next) => {
  console.log("POST Method")
  var Email = req.params.Email
  Account.findOne({
    "Email": Email
  }, function (err, foundObject) {
    if (err) {
      console.log(err)
      res.status(500).send()
    } else {
      if (!foundObject) {
        res.status(404).send()
      } else {
        if (req.body.Username) {
          foundObject.Username = req.body.Username
        }
        if (req.body.Password) {
          foundObject.Password = req.body.Password
        }
        if (req.body.ID) {
          foundObject.ID = req.body.ID
        }
        if (req.body.Email) {
          foundObject.Email = req.body.Email
        }
        foundObject.save(function (err, updateObject) {
          if (err) {
            console.log(err)
            res.status(500).send();
          } else {
            res.send({
              success: true,
              message: 'Update successfully!'
            })
          }
        })
      }
    }
  })
})

// Confirm Account for ADMIN section By ID 
app.put("/ConfirmAccount/:ID", (req, res, next) => {
  console.log("POST Method")
  var ID = req.params.ID
  Account.findOne({
    "ID": ID
  }, function (err, foundObject) {
    if (err) {
      console.log(err)
      res.status(500).send()
    } else {
      if (!foundObject) {
        res.status(404).send()
      } else {
        foundObject.RegisterStatus = "1"
        foundObject.save(function (err, updateObject) {
          if (err) {
            console.log(err)
            res.status(500).send();
          } else {
            res.send({
              success: true,
              message: 'Update successfully!'
            })
          }
        })
      }
    }
  })
})