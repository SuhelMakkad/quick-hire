import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
import { verifyJWT } from "@/lib/auth/jwt";
import { routes } from "@/utils/routes";

const handleUnauthorized = (reqUrl: string) => {
  if (reqUrl.includes("api")) {
    return new NextResponse(
      JSON.stringify({
        status: "failed",
        message: "Unauthorized",
      }),
      { status: 401 }
    );
  }

  return NextResponse.redirect(new URL(routes.login, reqUrl), { status: 303 });
};

export async function middleware(request: NextRequest) {
  const reqUrl = request.url;
  const jwt = cookies().get("JWT")?.value as string;

  if (!jwt) {
    return handleUnauthorized(reqUrl);
  }

  try {
    const { payload } = await verifyJWT(jwt);
    if (payload.role !== "admin") {
      return handleUnauthorized(reqUrl);
    }
  } catch (e) {
    console.error(e);
    return handleUnauthorized(reqUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};
