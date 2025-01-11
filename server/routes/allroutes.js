const express = require("express");
const authenticate = require("../auth/authmid");
const roleAuthorization = require("../auth/role");
const claimSchema = require("../models/claimSchema");
const upload = require("../controllers/fileUpload");
const router = express.Router();

router.post(
  "/claim",
  authenticate,
  roleAuthorization(["Patient"]),
  upload.single("uploadedDocument"),
  async (req, res) => {
    console.log(req.body)
    try {
      const {  name, email, claimAmount, description } = req.body;
      const userID= req.user.id
      const newClaim = new claimSchema({
        userID,
        name,
        email,
        claimAmount,
        description,
        uploadedDocument: req.file.path,
      });
      await newClaim.save();

      res
        .status(201)
        .json({ message: "Claim submitted successfully!", Claim: newClaim });
    } catch (error) {
      console.error("Error submitting claim:", error);
      res
        .status(500)
        .json({ message: "Server error. Please try again later." });
    }
  }
);

router.get(
  "/getall",
  authenticate,
  roleAuthorization(["Insurer"]),
  async (req, res) => {
    try {
      const patient = await claimSchema.find();
      res.json(patient);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

router.get("/myclaims", authenticate, async (req, res) => {
  try {
    console.log(req.user);  
    
    const userID = req.user.id; 
    
    const claims = await claimSchema.find({ userID });  

    console.log(claims);  


    if (!claims || claims.length === 0) {
      return res.status(404).json({ message: "No claims found" });
    }


    res.status(200).json({ message: "Claims retrieved successfully", claims });
  } catch (error) {
    console.error("Error fetching claims:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});



router.patch("/claim/:id", async (req, res) => {
  const { id } = req.params;
  const { status, insurerComments, approvedAmount } = req.body;
  console.log(JSON.stringify(req.body)+ "Aa rha hay ye")



  if (
    approvedAmount &&
    (typeof approvedAmount !== "number" || approvedAmount < 0)
  ) {
    return res.status(400).json({ message: "Invalid approvedAmount value" });
  }

  try {
    const updateFields = {};

    if (status) updateFields.status = status;
    if (insurerComments) updateFields.insurerComments = insurerComments;
    if (approvedAmount !== undefined)
      updateFields.approvedAmount = approvedAmount;

    const updatedClaim = await claimSchema.findByIdAndUpdate(id, updateFields, {
      new: true,
    });

    if (!updatedClaim) {
      return res.status(404).json({ message: "Claim not found" });
    }

    res
      .status(200)
      .json({ message: "Claim updated successfully", updatedClaim });
  } catch (error) {
    console.error("Error updating claim:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
