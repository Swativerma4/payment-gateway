const User = require('../models/User'); 

exports.postLogin = async (req, res) => {
  try {
    const { email, password } = req.body; 
    console.log(req.body)
    if (!email || !password) {
      return res.status(400).json({ message: "Email or Password is missing", success: false });
    }
    const user = await User.findOne({ Email: email });
    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }
    if (password !== user.Password) {
      return res.status(401).json({ message: "Incorrect password", success: false });
    }
    res.status(200).json({ 
      message: "Login successful", 
      success: true, 
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.Email,
        role: user.Role,
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

exports.postRegister = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      Phone,
      fatherName,
      City,
      Qualification,
      Pincode,
      Email,
      Password,
      Role
    } = req.body;
    console.log(req.body)

    // Validate required fields
    if (
      !firstName ||
      !lastName ||
      !Phone ||
      !fatherName ||
      !City ||
      !Email ||
      !Password ||
      !Role
    ) {
      return res.status(400).json({ message: "All required fields must be filled", success: false });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ Email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists", success: false });
    }

    // Create a new user
    const newUser = new User({
      firstName,
      lastName,
      Phone,
      fatherName,
      City,
      Qualification,
      Pincode,
      Email,
      Password,
      Role
    });

    // Save user to the database
    await newUser.save();

    res.status(201).json({ message: "User registered successfully", success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};