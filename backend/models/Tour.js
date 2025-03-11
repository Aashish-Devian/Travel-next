import mongoose from "mongoose";

const tourSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    city: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    distance: {
      type: Number,
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    maxGroupSize: {
      type: Number,
      required: true,
    },
    reviews: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Review",
      },
    ],
    featured: {
      type: Boolean,
      default: false,
    },
    overview: [
      {
        type: String,
        required: true,
      },
    ],
    include: [
      {
        type: String,
        required: true,
      },
    ],
    itinerary: [
      {
        day: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
      },
    ],
    equipment: [
      {
        type: String,
        required: true,
      },
    ],
    tripMap: {
      type: String,
      required: true,
    },
    video: {
      type: String,
      required: true,
    },
    faqs: [
      {
        question: {
          type: String,
          required: true,
        },
        answer: { 
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Tour", tourSchema);
