import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { profileSchemaServer } from "@/utils/schema";
import type { ApplyResponse, ErrorResponse } from "@/utils/api";

export async function POST(req: Request): Promise<NextResponse<ApplyResponse | ErrorResponse>> {
  try {
    const formData = await req.formData();
    const data: Record<string, string | File> = {};

    formData.forEach((value, key) => (data[key] = value as string | File));

    profileSchemaServer.parse(data);
    console.log(formData);
    console.log(data);

    return NextResponse.json({ status: "success", applicationId: "id" }, { status: 200 });
  } catch (e) {
    let err = e;
    let message = "";

    if (err instanceof ZodError) {
      err = err.issues.map((e) => ({ path: e.path[0], message: e.message }));
      message = "Invalid fields";
    }

    return NextResponse.json(
      {
        status: "failed",
        error: err,
        message,
      },
      {
        status: 409,
      }
    );
  }
}
