import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      min: 3,
      max: 20,
    },
    lastname: {
      type: String,
      required: true,
      min: 3,
      max: 20,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: true,
    },
    phone: {
      type: Number,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    country: {
      type: String,
    },
    role: {
      type: String,
    },
    timezone: {
      type: String,
    },
    defaultCurrency: {
      type: String,
    },
  },
  { timestamps: true }
);

const candidateSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      min: 3,
      max: 20,
    },
    lastname: {
      type: String,
      required: true,
      min: 3,
      max: 20,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    hiringStage: {
      type: String,
    },
    appliedJobs: { type: mongoose.Schema.Types.ObjectId, ref: "Job"},
    workExperience: {
      type: Array,
    },
    educationHistory: {
      type: Array,
      required: true,
    },
    img: {
      required: true,
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
    highestQualification: {
      type: String,
      required: true,
    },
    jobTitle: {
      type: String,
      required: true,
    },
    employer: {
      type: String,
      required: true,
    },
    expectedSalary: {
      type: Number,
      required: true,
    },
    currentSalary: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    desc: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
    img: {
      type: String,
    },
    color: {
      type: String,
    },
    size: {
      type: String,
    },
  },
  { timestamps: true }
);

const jobSchema = new mongoose.Schema(
  {
    jobOpeningId: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
      default: "Not available",
    },
    jobDesc: {
      type: String,
      default: "Not available",
    },
    recruiter: {
      type: String,
      default: "Not available",
    },
    targetDate: {
      type: Date,
      required: true,
    },
    clientName: {
      type: String,
      default: "Not available",
    },
    status: {
      type: String,
      required: true,
      default: "Not available",
    },
    minExperience: {
      type: String,
      default: "Not available",
    },
    maxExperience: {
      type: String,
      default: "Not available",
    },
    skills: {
      type: String,
      default: "Not available",
    },
    educationQualification: {
      type: String,
      default: "Not available",
    },
    educationSpecialization: {
      type: String,
      default: "Not available",
    },
    jobType: {
      type: String,
      default: "Not available",
    },
    minSalary: {
      type: String,
      default: "Not available",
    },
    maxSalary: {
      type: String,
      required: true,
      default: "Not available",
    },
    address: {
      type: String,
      default: "Not available",
    },
    state: {
      type: String,
      default: "Not available",
    },
    country: {
      type: String,
      default: "Not available",
    },
    workplaceModule: {
      type: String,
      default: "Not available",
    },
    companyName: {
      type: String,
      required: true,
      default: "Not available",
    },
    companyWebsite: {
      type: String,
      required: true,
      default: "Not available",
    },
    companyLogo: {
      type: String,
      required: true,
    },
    hiringPipeline: {
      type: String,
      required: true,
    },
    hiringStages: {
      type: Array,
      required: true,
    },
    // accountManager: {
    //   type: String,
    //   required: true,
    // },
  },
  { timestamps: true }
);


const interviewSchema = new mongoose.Schema(
  {
    interviewName: {
      type: String,
      required: true,
    },
    client: { type: mongoose.Schema.Types.ObjectId, ref: "Client"},
    candidate: { type: mongoose.Schema.Types.ObjectId, ref: "Candidate"},
    postingTitle: {
      type: String,
    },
    fromDate: {
      type: Date,
      required: true,
    },
    toDate: {
      type: Date,
      required: true,
    },
    interviewer: {
      type: String,
    },
    location: {
      type: String,
      required: true,
    },
    interviewOwner: {
      type: String,
    },
    scheduleComments: {
      type: String,
      default: "Not available",
    },
    assessmentName: {
      type: String,
      default: "Not available",
    },
  },
  { timestamps: true }
);

const interviewvideoSchema = new mongoose.Schema(
  {
    interviewName: {
      type: String,
      required: true,
    },
    candidate: { type: mongoose.Schema.Types.ObjectId, ref: "Candidate"},
    postingTitle: {
      type: String,
    },
    fromDate: {
      type: Date,
      required: true,
    },
    toDate: {
      type: Date,
      required: true,
    },
    interviewer: {
      type: String,
    },
    interviewOwner: {
      type: String,
    },
    scheduleComments: {
      type: String,
      default: "Not available",
    },
    provider:{
      type: String,
    }
  },
  { timestamps: true }
);

const clientSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: String,
    },
    accountManager: {
      type: String,
    },
  },
  { timestamps: true }
);

export const User = mongoose.models.User || mongoose.model("User", userSchema);
export const Candidate =
  mongoose.models.Candidate || mongoose.model("Candidate", candidateSchema);
export const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);
export const Job = mongoose.models.Job || mongoose.model("Job", jobSchema);
export const Interview = mongoose.models.Interview || mongoose.model("Interview", interviewSchema);
export const Interviewvideo = mongoose.models.Interviewvideo || mongoose.model("Interviewvideo", interviewvideoSchema);
export const Client = mongoose.models.Client || mongoose.model("Client", clientSchema);
