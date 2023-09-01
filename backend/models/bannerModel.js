import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  caption: {
    type: String,
  },
});

const Banner = mongoose.model("Banner", bannerSchema);

export default Banner;
