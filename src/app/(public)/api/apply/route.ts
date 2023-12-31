import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { submitApplication } from "@/lib/submit-application";
import { profileSchemaServer } from "@/utils/schema";
import { getApplicationRoute } from "@/utils/routes";
import type { ApplyResponse, ErrorResponse } from "@/utils/api";

export async function POST(req: Request): Promise<NextResponse<ApplyResponse | ErrorResponse>> {
  try {
    const formData = await req.formData();
    const data: Record<string, string | File> = {};
    formData.forEach((value, key) => (data[key] = value as string | File));

    const parsedData = profileSchemaServer.parse(data);
    const applicationId = await submitApplication(parsedData);

    revalidatePath(getApplicationRoute(applicationId));

    return NextResponse.json({ status: "success", applicationId }, { status: 200 });
  } catch (e) {
    console.error("failed to accept application");
    console.error(e);

    let err = e;
    let message = "";
    let status = 500;

    if ((e as any).message === "applied") {
      message = "You have already applied to this job";
      status = 409;
    } else if (err instanceof ZodError) {
      err = err.issues.map((e) => ({ path: e.path[0], message: e.message }));
      message = "Invalid fields";
      status = 400;
    }

    return NextResponse.json(
      {
        status: "failed",
        error: err,
        message,
      },
      {
        status,
      }
    );
  }
}
