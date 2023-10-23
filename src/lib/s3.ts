import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import type {
  DeleteObjectsCommandInput,
  GetObjectCommandInput,
  PutObjectCommandInput,
} from "@aws-sdk/client-s3";
import { s3BaseUrl } from "@/utils/routes";

const s3Region = "us-east-1";
const bucket = process.env.AWS_S3_BUCKET_NAME;
const accessKeyId = process.env.AWS_S3_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_S3_SECRET_ACCESS_KEY;

if (!bucket || !accessKeyId || !secretAccessKey) {
  throw new Error("Missing S3 Credentials");
}

export const s3Client = new S3({
  region: s3Region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

export const uploadFile = async (file: File, filePath: string): Promise<boolean> => {
  const params: PutObjectCommandInput = {
    Bucket: bucket,
    Key: filePath,
    Body: Buffer.from(await file.arrayBuffer()),
  };

  try {
    const command = new PutObjectCommand(params);
    await s3Client.send(command);
    return true;
  } catch (err) {
    console.error("S3 upload error:", err);
    return false;
  }
};

export const getPreSignedUrl = async (filePath: string) => {
  let s3FilePath = filePath;
  if (filePath.includes(s3BaseUrl)) {
    s3FilePath = filePath.split(`${s3BaseUrl}/`)[1];
  }

  const params: GetObjectCommandInput = {
    Bucket: bucket,
    Key: s3FilePath,
  };

  try {
    const command = new GetObjectCommand(params);
    const res = await s3Client.send(command);
    const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });

    return url;
  } catch (err) {
    console.error("S3 upload error:", err);
    return;
  }
};

export const deleteObject = async (filePath: string) => {
  if (!filePath || typeof filePath !== "string") return;

  let s3FilePath = filePath;
  if (filePath.includes(s3BaseUrl)) {
    s3FilePath = filePath.split(`${s3BaseUrl}/`)[1];
  }

  const config = {
    Bucket: bucket,
    Key: s3FilePath,
  };

  try {
    await s3Client.deleteObject(config);
  } catch (e) {
    console.error(config);
    console.error(e);
  }
};

export const deleteS3Folder = async (folder: string) => {
  const listParams = {
    Bucket: bucket,
    Prefix: folder,
  };

  const listedObjects = await s3Client.listObjectsV2(listParams);

  if (!listedObjects.Contents?.length) return;

  const deleteParams: DeleteObjectsCommandInput = {
    Bucket: bucket,
    Delete: { Objects: [] },
  };

  listedObjects.Contents.forEach(({ Key }) => {
    if (Key) {
      deleteParams.Delete?.Objects?.push({ Key });
    }
  });

  await s3Client.deleteObjects(deleteParams);

  if (listedObjects.IsTruncated) await deleteS3Folder(folder);
};

export const deleteS3Files = async (filePaths: string[]) => {
  const promises: Promise<void>[] = [];
  filePaths.forEach((filePath) => {
    const promise = deleteObject(filePath);
    promises.push(promise);
  });

  await Promise.allSettled(promises);
  return;
};
