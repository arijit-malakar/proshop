import express from "express";
import asyncHandler from "../middleware/asyncHandler.js";
import Banner from "../models/bannerModel.js";

const router = express.Router();

const getAllBannerItems = asyncHandler(async (req, res) => {
  const bannerItems = await Banner.find({});
  res.status(200).json(bannerItems);
});

const addBannerItem = asyncHandler(async (req, res) => {
  const bannerItem = new Banner({
    image: "/images/sample.jpg",
    caption: "Sample Caption",
  });

  const addedBannerItem = await bannerItem.save();
  res.status(201).json(addedBannerItem);
});

const updateBannerItem = asyncHandler(async (req, res) => {
  const { image, caption } = req.body;
  const bannerItem = await Banner.findById(req.params.id);

  if (bannerItem) {
    bannerItem.image = image;
    bannerItem.caption = caption;

    const updatedBannerItem = await bannerItem.save();
    res.json(updatedBannerItem);
  } else {
    res.status(404);
    throw new Error("Unable to find a banner item to update");
  }
});

const deleteBannerItem = asyncHandler(async (req, res) => {
  const bannerItem = await Banner.findById(req.params.id);

  if (bannerItem) {
    await Banner.deleteOne({ _id: bannerItem._id });
    res.status(204).json({ message: "Banner item deleted" });
  } else {
    res.status(404);
    throw new Error("Could not delete banner item");
  }
});

router.route("/").get(getAllBannerItems).post(addBannerItem);
router.route("/:id").put(updateBannerItem).delete(deleteBannerItem);

export default router;
