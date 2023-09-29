import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
    });

    const loginLink: string = new URL("/login", request.nextUrl.origin).href;

    const dashboardLink: string = new URL("/dashboard", request.nextUrl.origin)
        .href;

    if (path === "/") {
        if (token) {
            return NextResponse.redirect(dashboardLink);
        } else {
            return NextResponse.redirect(loginLink);
        }
    }

    if (path.startsWith("/dashboard") && !token) {
        return NextResponse.redirect(loginLink);
    }

    if (path === "/login" && token) {
        return NextResponse.redirect(dashboardLink);
    }
}

export const config = {
    matcher: [
        "/",
        "/login/",
        "/dashboard/:path*",
    ],
};
