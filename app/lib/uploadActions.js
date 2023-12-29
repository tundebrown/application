"use server";
import path from "path";
import fs from "fs/promises";
import { v4 as uuidv4 } from "uuid";
import os from "os";
import cloudinary from "cloudinary";
import { revalidatePath } from "next/cache";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

async function savePhotosToLocal(formData, filename) {
  const file = formData.get(filename);

  // console.log(file);

  const multipleBuffersPromise = file.arrayBuffer().then((data) => {
    const buffer = Buffer.from(data);
    const name = uuidv4();
    const ext = file.type.split("/")[1];

    // const uploadDir = path.join(process.cwd(), "public", `/images/${file.name}`)
    // const uploadDir = path.join(process.cwd(), "public", `/images/${name}.${ext}`) //Doesn't work in vercel

    const tempdir = os.tmpdir();
    //debug temporary directory
    console.log(`tempdir: ${tempdir}`);
    const uploadDir = path.join(tempdir, `/${name}.${ext}`); // work in vercel
    //debug upload directory
    console.log(`uploadDir: ${uploadDir}`);

    fs.writeFile(uploadDir, buffer);

    return {
      filepath: uploadDir,
      filename: file.name,
      uploadname: `${name}.${ext}`,
    };
  });

  // const multipleBuffersPromise = files.map((file) =>
  //   file.arrayBuffer().then((data) => {
  //     const buffer = Buffer.from(data);
  //     const name = uuidv4();
  //     const ext = file.type.split("/")[1];

  //     // const uploadDir = path.join(process.cwd(), "public", `/images/${file.name}`)
  //     // const uploadDir = path.join(process.cwd(), "public", `/images/${name}.${ext}`) //Doesn't work in vercel

  //     const tempdir = os.tmpdir();
  //     //debug temporary directory
  //     console.log(`tempdir: ${tempdir}`)
  //     const uploadDir = path.join(tempdir, `/${name}.${ext}`); // work in vercel
  //     //debug upload directory
  //     console.log(`uploadDir: ${uploadDir}`)

  //     fs.writeFile(uploadDir, buffer);

  //     return { filepath: uploadDir, filename: file.name };
  //   })
  // );

  // return await Promise.all(multipleBuffersPromise);
  return await Promise.resolve(multipleBuffersPromise);
}

async function uploadPhotosToCloudinary(newFiles, folder, fileType) {
  console.log(newFiles);
  const uploadOptions = {
    resource_type: fileType, // Set resource_type to 'auto' for Cloudinary to determine based on content
  };
  const multiplePhotosPromise = cloudinary.v2.uploader.upload(
    newFiles.filepath, uploadOptions,
    { folder: folder }
  );

  // const multiplePhotosPromise = newFiles.map((file) =>
  //   cloudinary.v2.uploader.upload(file.filepath, { folder: "company_logo" })
  // );

  // return await Promise.all(multiplePhotosPromise);
  return await Promise.resolve(multiplePhotosPromise);
}

const delay = (delayInms) => {
  return new Promise((resolve) => setTimeout(resolve, delayInms));
};


//Upload File

export async function uploadPhoto(formData, folder, filename, fileType) {
  try {
    // Save photo files to temp folder
    const newFiles = await savePhotosToLocal(formData, filename);

    //debug newFile
    // console.log(`newFile: ${newFiles}`)

    //Upload to the cloud after saving the photo file to the temp folder
    const photos = await uploadPhotosToCloudinary(newFiles, folder, fileType);
    console.log(photos);

    //Delete photo files in temp folder after successful upload!
    // newFiles.map((file) => fs.unlink(file.filepath));
    fs.unlink(newFiles.filepath);

    // delay about 2s to update cloudinary database
    // then revalidatePath => call getAllPhotos()
    // await delay(2000);

    // revalidatePath("/");
    return { msg: "Upload Successful!", filename: photos.secure_url };
  } catch (error) {
    return { errMsg: error.message };
  }
}

export async function getAllPhotos() {
  try {
    const { resources } = await cloudinary.v2.search
      .expression("folder:nextjs_upload/*")
      .sort_by("created_at", "desc")
      .max_results(500)
      .execute();

    return resources;
  } catch (error) {
    return { errMsg: error.message };
  }
}

export async function deletePhoto(public_id) {
  try {
    await cloudinary.v2.uploader.destroy(public_id);

    revalidatePath("/");

    return { msg: "Delet Success!" };
  } catch (error) {
    return { errMsg: error.message };
  }
}

export async function revalidate(path) {
  revalidatePath(path);
}
