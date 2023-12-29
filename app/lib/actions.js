"use server";

import { revalidatePath } from "next/cache";
import { Candidate, Job, Product, User } from "./models";
import { connectToDB } from "./utils";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import { signIn } from "../auth";
import { uploadPhoto } from "./uploadActions";
import { LocaleRouteNormalizer } from "next/dist/server/future/normalizers/locale-route-normalizer";


//Create User

export const addUser = async (formData) => {
  const {
    username,
    lastname,
    email,
    password,
    img,
    isAdmin,
    phone,
    city,
    state,
    country,
    role,
    timezone,
    defaultCurrency,
  } = Object.fromEntries(formData);

  try {
    connectToDB();

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      lastname,
      email,
      password: hashedPassword,
      img,
      isAdmin,
      phone,
      city,
      state,
      country,
      role,
      timezone,
      defaultCurrency,
    });

    await newUser.save();
  } catch (err) {
    console.log(err);
    throw new Error(`Failed to create user! ${err}`);
  }

  revalidatePath("/dashboard/signup");
  redirect("/dashboard/signup");
};


//Upadate User

export const updateUser = async (formData) => {
  const {
    id,
    username,
    lastname,
    email,
    password,
    img,
    phone,
    city,
    state,
    country,
    timezone,
    defaultCurrency,
  } = Object.fromEntries(formData);

  try {
    connectToDB();

    const updateFields = {
      username,
      lastname,
      email,
      password,
      img,
      phone,
      city,
      state,
      country,
      timezone,
      defaultCurrency,
    };

    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || undefined) && delete updateFields[key]
    );

    await User.findByIdAndUpdate(id, updateFields);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to update user!");
  }

  revalidatePath("/dashboard/profile");
  redirect("/dashboard/profile");
};

//Create Candidate

export const addCandidate = async (formData) => {
  console.log(formData)
  const formDataArray = Array.from(formData.entries());

const filteredWorkItems = formDataArray
  .filter(([name, value]) => name.startsWith('workExperience'))
  .map(([name, value]) => {
    const values = value.split(',');

    // Assuming the order is title, company, location
    const [title, company, location] = values;

    return {
      title,
      company,
      location,
    };
  });

  const filteredEducationItems = formDataArray
  .filter(([name, value]) => name.startsWith('educationHistory'))
  .map(([name, value]) => {
    const values = value.split(',');

    // Assuming the order is title, company, location
    const [collegeName, qualification, grade] = values;

    return {
      collegeName,
      qualification,
      grade,
    };
  });

console.log(filteredWorkItems);
  const {
    firstname,
    lastname,
    email,
    appliedJobs,
    img,
    phone,
    address,
    experience,
    highestQualification,
    jobTitle,
    employer,
    expectedSalary,
    currentSalary,
  } = Object.fromEntries(formData);

  // const actualFilePath = "/nofile.jpg";

  const res = await uploadPhoto(formData, "resume", "img", "raw")
  const actualFilePath = res.filename
  // console.log(workExperience)
  let currentHiringStage

  if(appliedJobs){
    currentHiringStage = "applied";
  } else {
    currentHiringStage = "None"
  }
  try {
    connectToDB();

    const newCandidate = new Candidate({
      firstname,
      lastname,
      email,
      appliedJobs,
      hiringStage: currentHiringStage,
      workExperience: filteredWorkItems,
      educationHistory: filteredEducationItems,
      img: actualFilePath,
      phone,
      address,
      experience,
      highestQualification,
      jobTitle,
      employer,
      expectedSalary,
      currentSalary,
    });

    await newCandidate.save();
  } catch (err) {
    console.log(err);
    throw new Error(`Failed to create candidate! ${err}`);
  }

  const currentPath = process.cwd();

  console.log('current working directory:' , currentPath)

  revalidatePath("/dashboard/candidates");
  redirect("/dashboard/candidates");
};


//Update Candidate

export const updateCandidate = async (formData) => {
  const {
    firstname,
    lastname,
    email,
    img,
    phone,
    address,
    experience,
    highestQualification,
    jobTitle,
    employer,
    expectedSalary,
    currentSalary,
  } = Object.fromEntries(formData);

  try {
    connectToDB();

    const updateFields = {
      firstname,
      lastname,
      email,
      img,
      phone,
      address,
      experience,
      highestQualification,
      jobTitle,
      employer,
      expectedSalary,
      currentSalary,
    };

    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || undefined) && delete updateFields[key]
    );

    await Candidate.findByIdAndUpdate(id, updateFields);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to update candidate!");
  }

  revalidatePath("/dashboard/candidates");
  redirect("/dashboard/candidates");
};

export const addProduct = async (formData) => {
  const { title, desc, price, stock, color, size } =
    Object.fromEntries(formData);

  try {
    connectToDB();

    const newProduct = new Product({
      title,
      desc,
      price,
      stock,
      color,
      size,
    });

    await newProduct.save();
  } catch (err) {
    console.log(err);
    throw new Error("Failed to create product!");
  }

  revalidatePath("/dashboard/products");
  redirect("/dashboard/products");
};

export const updateProduct = async (formData) => {
  const { id, title, desc, price, stock, color, size } =
    Object.fromEntries(formData);

  try {
    connectToDB();

    const updateFields = {
      title,
      desc,
      price,
      stock,
      color,
      size,
    };

    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || undefined) && delete updateFields[key]
    );

    await Product.findByIdAndUpdate(id, updateFields);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to update product!");
  }

  revalidatePath("/dashboard/products");
  redirect("/dashboard/products");
};




//Create Job

export const addJob = async (formData) => {
  const {
    jobOpeningId,
    title,
    jobDesc,
    recruiter,
    targetDate,
    clientName,
    status,
    minExperience,
    maxExperience,
    skills,
    jobType,
    minSalary,
    maxSalary,
    address,
    state,
    country,
    educationQualification,
    educationSpecialization,
    workplaceModule,
    companyName,
    companyWebsite,
    companyLogo,
    hiringPipeline,
    applied,
    contacted,
    interviewScheduled,
    interviewNotAttended,
    interviewRescheduled,
    rejected,
    onHold,
    selected, 
    offered
    // accountManager,
  } = Object.fromEntries(formData);

  // const actualFilePath = "/nologo.png";
  // console.log(formData)

  const res = await uploadPhoto(formData, "company_logo", "companyLogo", "auto")
  const actualFilePath = res.filename
  let hiringStages

  if(hiringPipeline === "masterPipeline"){
    hiringStages = ["applied", "contacted", "interviewScheduled", "interviewNotAttended", "interviewRescheduled", "rejected", "onHold", "selected", "offered"]
  } else (
    hiringStages = [applied, contacted, interviewScheduled, interviewNotAttended, interviewRescheduled, rejected, onHold, selected, offered]
  )

  try {
    connectToDB();

    const newJob = new Job({
      jobOpeningId,
      title,
      jobDesc,
      recruiter,
      targetDate,
      clientName,
      status,
      minExperience,
      maxExperience,
      skills,
      jobType,
      minSalary,
      maxSalary,
      address,
    state,
    country,
    educationQualification,
    educationSpecialization,
      workplaceModule,
      companyName,
      companyWebsite,
      companyLogo: actualFilePath,
      hiringPipeline,
      hiringStages: hiringStages
      // accountManager,
    });

    await newJob.save();
  } catch (err) {
    console.log(err);
    throw new Error(`Failed to create job! ${err}`);
  }

  revalidatePath("/dashboard/jobs");
  redirect("/dashboard/jobs");
};


//Update Job

export const updateJob = async (formData) => {
  const {
    id,
    jobOpeningId,
    title,
    jobDesc,
    recruiter,
    targetDate,
    clientName,
    status,
    minExperience,
    maxExperience,
    skills,
    jobType,
    minSalary,
    maxSalary,
    address,
    state,
    country,
    educationQualification,
    educationSpecialization,
    workplaceModule,
    companyName,
    companyWebsite,
    companyLogo,
  } = Object.fromEntries(formData);

  const res = await uploadPhoto(formData, "company_logo", "companyLogo", "auto")

  const actualFilePath = res.filename

  console.log(actualFilePath)

  try {
    connectToDB();

    const updateFields = {
      jobOpeningId,
      title,
      jobDesc,
      recruiter,
      targetDate,
      clientName,
      status,
      minExperience,
      maxExperience,
      skills,
      jobType,
      minSalary,
      maxSalary,
      address,
    state,
    country,
    educationQualification,
    educationSpecialization,
      workplaceModule,
      companyName,
      companyWebsite,
      companyLogo: actualFilePath,
    };

    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || undefined) && delete updateFields[key]
    );

    await Job.findByIdAndUpdate(id, updateFields);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to update Job!");
  }

  revalidatePath("/dashboard/jobs");
  redirect("/dashboard/jobs");
};


//Delete User

export const deleteUser = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDB();
    await User.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete user!");
  }

  revalidatePath("/dashboard/products");
};

//Delete Candidate

export const deleteCandidate = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDB();
    await Candidate.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete candidate!");
  }

  revalidatePath("/dashboard/candidates");
};

export const deleteProduct = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDB();
    await Product.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete product!");
  }

  revalidatePath("/dashboard/products");
};


//Delete Job

export const deleteJob = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDB();
    await Job.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
    throw new Error(`Failed to delete job! ${err}`);
  }

  revalidatePath("/dashboard/jobs");
};


//Authenticate user

export const authenticate = async (prevState, formData) => {
  const { username, password } = Object.fromEntries(formData);

  await signIn("credentials", { username, password });
  // try {
  //   revalidatePath("/dashboard");
  //   redirect("/dashboard");
  // } catch (err) {
  //   return err.Error;
  //   // return "Wrong Credentials!";
  //   // console.log(err);
  //   // throw new Error(`Wrong Credentials! ${err}`)
  // }
};
