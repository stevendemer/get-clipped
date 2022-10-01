import mongoose from "mongoose";
import validator from "validator";
import bcryptjs from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      maxLength: [50, "Email too long !"],
      validate: {
        validator: function (v) {
          if (!validator.isEmail(v)) {
            return false;
          }
        },
      },
    },
    username: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minLength: [8, "Password must be at least 8 characters long"],
    },
    age: {
      type: Number,
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    // createdAt - updatedAt
    timestamps: true,
  }
);

// Custom middleware for hashing the user password
// and updating the model with the hashed password
userSchema.pre("save", (next) => {
  if (this.isModified("password") || this.isNew) {
    bcryptjs.genSalt(14, (saltError, salt) => {
      if (saltError) {
        return next(saltError);
      } else {
        bcryptjs.hash(this.password, salt, (hashError, hash) => {
          if (hashError) {
            return next(hashError);
          }
          this.password = hash;
          next();
        });
      }
    });
  } else {
    return next();
  }
});

const User = mongoose.model("User", userSchema);

export default User;
