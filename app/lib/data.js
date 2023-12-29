import { MdEmail, MdFileCopy, MdOutlineWork, MdPerson, MdSupervisedUserCircle } from "react-icons/md";
import { Candidate, Job, Product, User } from "./models";
import { connectToDB } from "./utils";

export const fetchUsers = async (q, page) => {
  const regex = new RegExp(q, "i");

  const ITEM_PER_PAGE = 10;

  try {
    connectToDB();
    // const count = await User.find({ username: { $regex: regex } }).count();
    // const users = await User.find({ username: { $regex: regex } })
    const count = await User.find({$and: [{ username: { $regex: regex }, }, { isAdmin: true }]} ).count();
    const users = await User.find({$and: [{ username: { $regex: regex }, }, { isAdmin: true }]})
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));
    return { count, users };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch users!");
  }
};

export const fetchUser = async (id) => {
  console.log(id);
  try {
    connectToDB();
    const user = await User.findById(id);
    return user;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch user!");
  }
};

export const fetchCandidates = async (q, page) => {
  const regex = new RegExp(q, "i");

  const ITEM_PER_PAGE = 10;

  try {
    connectToDB();
    const count = await Candidate.find({ firstname: { $regex: regex } }).count();
    const candidates = await Candidate.find({ firstname: { $regex: regex } })
    // const count = await Candidate.find({$and: [{ firstname: { $regex: regex }, }, { isAdmin: false }]} ).count();
    // const users = await User.find({$and: [{ username: { $regex: regex }, }, { isAdmin: false }]})
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));
    return { count, candidates };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch candidates!");
  }
};

export const fetchCandidate = async (id) => {
  console.log(id);
  try {
    connectToDB();
    const candidate = await Candidate.findById(id);
    return candidate;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch candidate!");
  }
};

export const fetchProducts = async (q, page) => {
  console.log(q);
  const regex = new RegExp(q, "i");

  const ITEM_PER_PAGE = 2;

  try {
    connectToDB();
    const count = await Product.find({ title: { $regex: regex } }).count();
    const products = await Product.find({ title: { $regex: regex } })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));
    return { count, products };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch products!");
  }
};

export const fetchProduct = async (id) => {
  try {
    connectToDB();
    const product = await Product.findById(id);
    return product;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch product!");
  }
};

export const fetchJobs = async (q, page) => {
  console.log(q);
  const regex = new RegExp(q, "i");

  const ITEM_PER_PAGE = 6;

  try {
    connectToDB();
    const count = await Job.find({ title: { $regex: regex } }).count();
    const jobs = await Job.find({ title: { $regex: regex } })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));
    return { count, jobs };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch jobs!");
  }
};

export const fetchJob = async (id) => {
  try {
    connectToDB();
    const job = await Job.findById(id);
    return job;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch job!");
  }
};

export const fetchTotalJobs = async () => {

  try {
    connectToDB();
    const countJob = await Job.find({ status: "active" }).count();
    // const users = await User.find({ username: { $regex: regex } })
    // const count = await User.find({$and: [{ username: { $regex: regex }, }, { isAdmin: true }]} ).count();
    // const users = await User.find({$and: [{ username: { $regex: regex }, }, { isAdmin: true }]})

    return { countJob };
  } catch (err) {
    console.log(err);
    throw new Error(`Failed to fetch total active jobs!${err}`);
  }
};

export const fetchTotalCandidates = async () => {

  try {
    connectToDB();
    const countCandidate = await Candidate.find().count();
    // const users = await User.find({ username: { $regex: regex } })
    // const count = await User.find({$and: [{ username: { $regex: regex }, }, { isAdmin: true }]} ).count();
    // const users = await User.find({$and: [{ username: { $regex: regex }, }, { isAdmin: true }]})

    return { countCandidate };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch total active jobs!", err);
  }
};



// DUMMY DATA

  const { countJob } = await fetchTotalJobs();
  const { countCandidate } = await fetchTotalCandidates();


export const cards = [
  {
    id: 1,
    title: "Active Jobs",
    number: countJob,
    icon: <MdOutlineWork />,
    color: "#990033",
  },
  {
    id: 2,
    title: "Applicants",
    number: countCandidate,
    icon: <MdPerson />,
    color: "indigo",
  },
  {
    id: 3,
    title: "Interviews",
    number: 0,
    icon: <MdSupervisedUserCircle />,
    color: "#006666",
  },
  {
    id: 3,
    title: "Hires",
    number: 0,
    icon: <MdEmail />,
    color: "#003399",
  },
];
