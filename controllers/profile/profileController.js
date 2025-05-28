const Profile = require("../../models/profile/Profile");

exports.createOrUpdateProfile = async (req, res, next) => {
  const {
    company,
    website,
    location,
    bio,
    status,
    githubUsername,
    skills,
    social,
  } = req.body;
  const profileFields = {
    user: req.user.id,
    company,
    website,
    location,
    bio,
    status,
    githubUsername,
    skills: skills?.split(",").map((skill) => skill.trim()),
    social,
  };

  try {
    let profile = await Profile.findOne({ user: req.user.id });
    if (profile) {
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );
      return res.json(profile);
    }
    profile = new Profile(profileFields);
    await profile.save();
    res.json(profile);
  } catch (err) {
    next(err);
  }
};

exports.getProfileDetails = async (req, res, next) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    if (!profile) return res.status(400).json({ msg: "Profile not found" });
    return res.status(200).json({ profile });
  } catch (err) {
    next(err);
  }
};

exports.addExperience = async (req, res, next) => {
  const newExp = req.body;
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    if (profile) {
      profile.experience.unshift(newExp);
      await profile.save();
      return res.json(profile);
    }
  } catch (err) {
    next(err);
  }
};

exports.deleteExperience = async (req, res, next) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    if (profile) {
      profile.experience = profile.experience.filter(
        (item) => item._id.toString() !== req.params.exp_id
      );
      await profile.save();
      res.json(profile);
    }
  } catch (err) {
    next(err);
  }
};

exports.addEducation = async (req, res, next) => {
  const newEdu = req.body;
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    if (profile) {
      profile.education.unshift(newEdu);
      await profile.save();
      res.json(profile);
    }
  } catch (err) {
    next(err);
  }
};

exports.deleteEducation = async (req, res, next) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    if (profile) {
      profile.education = profile.education.filter(
        (item) => item._id.toString() !== req.params.edu_id
      );
      await profile.save();
      res.json(profile);
    }
  } catch (err) {
    next(err);
  }
};
