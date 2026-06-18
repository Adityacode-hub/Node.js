const express=require("express");
const router=express.Router();
const passport = require("passport");
const Profile = require("../../models/Profile");

//@type GET
//@route /api/auth/profile/me
//@desc route to user profile
//@access PROTECTED
router.get(
    "/me",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        try {
            const profile = await Profile.findOne({
                user: req.user.id
            });

            if (!profile) {
                return res.status(404).json({
                    error: "Profile not found"
                });
            }

            res.json(profile);
        } catch (err) {
            res.status(500).json({ error: "Server error" });
        }
    }
);

//for updating the profile
router.post(
    "/create",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        try {
            const profileFields = {};

            profileFields.user = req.user.id;
            profileFields.username = req.body.username;
            profileFields.website = req.body.website;
            profileFields.country = req.body.country;
            profileFields.portfolio = req.body.portfolio;

            if (req.body.languages) {
                profileFields.languages =
                    req.body.languages.split(",");
            }

            profileFields.social = {};
            profileFields.social.youtube = req.body.youtube;
            profileFields.social.twitter = req.body.twitter;
            profileFields.social.github = req.body.github;

            let profile = await Profile.findOne({
                user: req.user.id
            });

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
            console.log(err);
            res.status(500).json({ error: "Server error" });
        }
    }
);
//get all profile
router.get("/all", async (req, res) => {
    try {
        const profiles = await Profile.find();
        res.json(profiles);
    } catch (err) {
        res.status(404).json({
            error: "No profiles found"
        });
    }
});
//by  id getting the profile

router.get("/:id", async (req, res) => {
    try {
        const profile = await Profile.findById(req.params.id);

        if (!profile) {
            return res.status(404).json({
                error: "Profile not found"
            });
        }

        res.json(profile);
    } catch (err) {
        res.status(404).json({
            error: "Invalid ID"
        });
    }
});

//work experience  role to add

router.post(
    "/work",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        try {
            const profile = await Profile.findOne({
                user: req.user.id
            });

            const newWork = {
                role: req.body.role,
                company: req.body.company,
                country: req.body.country,
                from: req.body.from,
                to: req.body.to,
                current: req.body.current,
                details: req.body.details
            };

            profile.workrole.unshift(newWork);
            await profile.save();

            res.json(profile);

        } catch (err) {
            res.status(500).json({ error: "Server error" });
        }
    }
);


//delete the job role

router.delete(
  "/work/:work_id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const profile = await Profile.findOne({
        user: req.user.id
      });

      if (!profile) {
        return res.status(404).json({
          error: "Profile not found"
        });
      }

      const removeIndex = profile.workrole
        .map(item => item.id)
        .indexOf(req.params.work_id);

      if (removeIndex === -1) {
        return res.status(404).json({
          error: "Work role not found"
        });
      }

      profile.workrole.splice(removeIndex, 1);

      await profile.save();

      res.json(profile);

    } catch (err) {
      console.log(err);
      res.status(500).json({
        error: "Server error"
      });
    }
  }
);

//update the whole profile
router.put(
  "/update",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const profile = await Profile.findOne({
        user: req.user.id
      });

      if (!profile) {
        return res.status(404).json({
          error: "Profile not found"
        });
      }

      // Update only if value provided
      if (req.body.username) profile.username = req.body.username;
      if (req.body.website) profile.website = req.body.website;
      if (req.body.country) profile.country = req.body.country;
      if (req.body.portfolio) profile.portfolio = req.body.portfolio;

      if (req.body.languages) {
        profile.languages = req.body.languages.split(",");
      }

      if (req.body.youtube) profile.social.youtube = req.body.youtube;
      if (req.body.twitter) profile.social.twitter = req.body.twitter;
      if (req.body.github) profile.social.github = req.body.github;

      await profile.save();

      res.json(profile);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        error: "Server Error"
      });
    }
  }
);


//specific job role updating

router.put(
  "/work/:work_id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const profile = await Profile.findOne({
        user: req.user.id
      });

      if (!profile) {
        return res.status(404).json({
          error: "Profile not found"
        });
      }

      const work = profile.workrole.find(
        item => item.id === req.params.work_id
      );

      if (!work) {
        return res.status(404).json({
          error: "Work role not found"
        });
      }

      // Update fields
      if (req.body.role) work.role = req.body.role;
      if (req.body.company) work.company = req.body.company;
      if (req.body.country) work.country = req.body.country;
      if (req.body.from) work.from = req.body.from;
      if (req.body.to) work.to = req.body.to;
      if (req.body.details) work.details = req.body.details;

      await profile.save();

      res.json(profile);

    } catch (err) {
      console.log(err);
      res.status(500).json({
        error: "Server error"
      });
    }
  }
);


router.get("/",(req,res)=>{
    res.json({test:"Profile is success"})
});
module.exports=router;
  