import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";
import { notFound } from "next/navigation";

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

    if (path.startsWith("/api")) {
        // if the method is not POST, return a 405
        if (request.method !== "POST") {
            return NextResponse.json(
                { error: "Method not allowed" },
                { status: 405 }
            );
        }

        // check the request headers for the authorization header
        const authorization = request.headers.get("Authorization");

        // if the authorization header is not present, return a 401
        if (authorization !== process.env.NEXTAUTH_SECRET) {
            return NextResponse.json(
                { error: "You are not authorized to access this route" },
                { status: 401 }
            );
        }

        // if the authorization header is present, return the request
        return NextResponse.next();
    }
}

export const config = {
    matcher: [
        "/",
        "/login/",
        "/dashboard/:path*",
        "/api/users/:path*",
        "/api/guilds/:path*",
    ],
};
