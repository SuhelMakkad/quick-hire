import { getDb } from "./db";

const getJobIds = async (limit = 12, offset = 0) => {
  const db = await getDb();
  const collection = db.collection("jobs");
  const data = await collection.find().project({ id: 1 }).skip(offset).limit(limit).toArray();

  return data as { id: string }[];
};

export default getJobIds;
