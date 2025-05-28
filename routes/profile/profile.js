const express = require("express");
const router = express.Router();
const {
  createOrUpdateProfile,
  getProfileDetails,
  addEducation,
  deleteEducation,
  addExperience,
  deleteExperience,
} = require("../../controllers/profile/profileController");
const authMiddleware = require("../../middleware/authMiddleware/authMiddleware");

router.post("/create_profile", authMiddleware, createOrUpdateProfile);
router.put("/update_profile", authMiddleware, createOrUpdateProfile);
router.get("/get_profile_details", authMiddleware, getProfileDetails);
router.put("/add_education", authMiddleware, addEducation);
router.delete("/delete_education/:edu_id", authMiddleware, deleteEducation);
router.put("/add_experience", authMiddleware, addExperience);
router.delete("/delete_experience/:exp_id", authMiddleware, deleteExperience);

module.exports = router;
