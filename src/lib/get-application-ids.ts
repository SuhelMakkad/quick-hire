import { getDb } from "./db";
import type { Application } from "@/utils/schema";

const getApplicationIds = async (limit = 0, offset = 0) => {
  const db = await getDb();
  const collection = db.collection<Application>("applications");
  const res = await collection
    .find()
    .project({ id: 1 })
    .sort({ timestamp: -1 })
    .skip(offset)
    .limit(limit)
    .toArray();

  return res as { id: string }[];
};

export default getApplicationIds;
