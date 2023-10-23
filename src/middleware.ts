import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
import { verifyJWT } from "@/lib/auth/jwt";

const unauthorizedRes = new NextResponse(
  JSON.stringify({
    status: "failed",
    message: "Unauthorized",
  }),
  { status: 401 }
);

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const jwt = cookies().get("JWT")?.value as string;

  if (!jwt) {
    return unauthorizedRes;
  }

  try {
    const { payload } = await verifyJWT(jwt);
    if (payload.role !== "admin") {
      return unauthorizedRes;
    }
  } catch (e) {
    console.error(e);
    return unauthorizedRes;
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};
