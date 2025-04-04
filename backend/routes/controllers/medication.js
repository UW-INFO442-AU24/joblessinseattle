import express from 'express';
var router = express.Router();


// GET for /medication
router.get('/medications', async (req, res) => {
      try {
          let allMedications = await req.models.Medications.find() //.find({username: username});
          let medications = await Promise.all(
            allMedications.map(async med => {
            try {
              // reads mongodb and returns all instances
              let {user_id, medicationName, medDescription, medFrequency, medTakenCount, lastMedTakenDate} = med;
              return {user_id, medicationName, medDescription, medFrequency, medTakenCount, lastMedTakenDate};
            }
            catch(error) {
              console.log("Error: ", error);
              return {type, error};
            }
            })
          );
          res.send(medications);
      }
      catch(error) {
        console.log("Error: ", error);
        res.status(500).json({status: "error", error: error});
      }
});

// POST to /medication
router.post('/', async (req, res) => {
    try {
      // saves the medication model data
      const newMedication = new req.models.Medications({
        user_id: req.body.user,
        medicationName : req.body.name,
        medDescription : req.body.description,
        medFrequency : req.body.frequency
      });
      await newMedication.save()
      res.json({"status" : "success"})
    }
    catch(error) {
      console.log("error: ", error);
      res.status(500).json({status: "error", error: error});
    }
});

// POST to /medication/counter (to update)
// router.post('/counter', async (req, res) => {
//   try {
//     // saves the medication model data
//     const newMedication = new req.models.Medications({
//       // user: "me",
//       medicationName : req.body.name,
//       medDescription : req.body.description,
//       medFrequency : req.body.frequency
//     });
//     console.log(newMedication)
//     // await newMedication.save()
//     res.json({"status" : "success"})
//   }
//   catch(error) {
//     console.log("error: ", error);
//     res.status(500).json({status: "error", error: error});
//   }
// });
  
export default router;