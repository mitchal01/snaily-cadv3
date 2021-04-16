import { NextApiResponse } from "next";
import { AnError } from "@lib/consts";
import { processQuery } from "@lib/database";
import { logger } from "@lib/logger";
import { IRequest } from "src/interfaces/IRequest";
import useAuth from "@hooks/useAuth";

export default async function (req: IRequest, res: NextApiResponse) {
  try {
    await useAuth(req);
  } catch (e) {
    return res.status(e?.code ?? 400).json({
      status: "error",
      error: e,
    });
  }

  switch (req.method) {
    case "DELETE": {
      try {
        await processQuery("UPDATE `users` SET `steam_id` = ? WHERE `id` = ?", ["", req.userId]);

        return res.json({
          status: "success",
        });
      } catch (e) {
        logger.error("UNLINK_STEAM", e);

        return res.status(500).json(AnError);
      }
    }

    default: {
      return res.status(405).json({
        error: "Method not allowed",
        status: "error",
      });
    }
  }
}