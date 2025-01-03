import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sendSms from "../utils/sendSms.js";
import sendEmail from "../utils/sendMail.js";
import config from "config";
import userModel from "../models/User/User.js";

const router = express.Router();
const URL = config.get("SERVER_URL");
const JWT_SECRET = config.get("JWT_SECRET");

router.post("/register", async (req, res) => {
  try {
    const { fullName, phone, email, password } = req.body;
    const emailFind = await userModel.findOne({ email });
    if (emailFind) {
      return res.status(400).json({ msg: "mail already exists" });
    }

    let hashPass = await bcrypt.hash(password, 10);
    const emailToken = Math.random().toString(36).substring(2);
    const phoneToken = Math.random().toString(36).substring(2);
    let newUser = {
      fullName,
      phone,
      email,
      password: hashPass,
      userVerifyToken: {
        email: emailToken,
        phone: phoneToken,
      },
    };
    await userModel.create(newUser);

    let emailData = {
      from: "Git Hub",
      to: email,
      subject: "Email Verfication",
      html: `<h1>Email Verify</h1>\n <p>Click below to verify Github email verfication</p>\n`,
      text: `${URL}/api/public/emailverify/${emailToken}`,
    };
    sendEmail(emailData);

    let smsData = {
      body: `please verify phone for github,${URL}/api/public/phoneverify/${phoneToken}`,
      to: phone,
    };
    sendSms(smsData);

    console.log(`${URL}/api/public/emailverify/${emailToken}`);
    console.log(`${URL}/api/public/phoneverify/${phoneToken}`);
    res.status(200).json({ msg: "user registered success verify email and phone" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
});

router.get("/emailverify/:token", async (req, res) => {
  try {
    let token = req.params.token;
    let user = await userModel.findOne({ "userVerifyToken.email": token });
    if (!user) {
      return res.status(400).json({ msg: "invalid token" });
    }
    if (user.userVerified.email == true) {
      return res.status(400).json({ msg: "mail already verified" });
    }

    (user.userVerified.email = true), (user.userVerifyToken.email = null);

    await user.save();
    res.status(200).json({ msg: "email verified" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.get("/phoneverify/:token", async (req, res) => {
  try {
    let token = req.params.token;
    let user = await userModel.findOne({ "userVerifyToken.phone": token });
    if (!user) {
      return res.status(400).json({ msg: "invalid token" });
    }
    if (user.userVerified.phone == true) {
      return res.status(400).json({ msg: "phone already verified" });
    }

    user.userVerified.phone = true;
    user.userVerifyToken.phone = null;

    await user.save();
    res.status(200).json({ msg: "phone verifed successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    let { email, password } = req.body;
    let user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "no email found" });
    }
    if (!user.userVerified.email) {
      return res.status(400).json({ msg: "email not verified" });
    }
    if (!user.userVerified.phone) {
      return res.status(400).json({ msg: "phone not verified" });
    }

    let match = bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ msg: "invalid credentials" });
    }

    const token = jwt.sign({ user }, JWT_SECRET, { expiresIn: "1h" });
    res.status(200).json({ msg: "log in successful here's you token", token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

export default router;
