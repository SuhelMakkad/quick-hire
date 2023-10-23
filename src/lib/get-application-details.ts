import { Application } from "@/utils/schema";
import { getDb } from "./db";

const getApplicationDetails = async (applicationId: string) => {
  const db = await getDb();
  const collection = db.collection<Application>("applications");

  const res = await collection.findOne({ id: applicationId });

  return res;
};

export default getApplicationDetails;
