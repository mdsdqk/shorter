import { prisma } from "../../../db/client";
import { NextApiRequest, NextApiResponse } from "next";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
	const slug = req.query["slug"];

	if (!slug || typeof slug !== "string") {
		res.statusCode = 404;
		res.send(JSON.stringify({ message: "please pass a slug" }));
		return;
	}

	const data = await prisma.shortLink.findFirst({
		where: {
			slug: {
				equals: slug
			}
		}
	});

	if (!data) {
		res.statusCode = 404;
		res.send(JSON.stringify({ message: "slug not found" }));
		return;
	}

	return res.json({ url: data.url });
}