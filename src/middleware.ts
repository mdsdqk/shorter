import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
	if (req.nextUrl.pathname.startsWith("/api/get-url/")) {
		console.log("\n returning early");
		return;
	}

	const slug = req.nextUrl.pathname.split("/").pop();
	//console.log("fetching from", `${req.nextUrl}/api/get-url/${slug}`);
	const data = await (await fetch(`${req.nextUrl.origin}/api/get-url/${slug}`)).json();

	if (data?.url) {
		return NextResponse.redirect(data.url);
	}

}