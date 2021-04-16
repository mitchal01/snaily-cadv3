import { NextApiResponse } from "next";
import useAuth from "@hooks/useAuth";
import { AnError } from "@lib/consts";
import { processQuery } from "@lib/database";
import { logger } from "@lib/logger";
import { IRequest } from "types/IRequest";
import { usePermission } from "@hooks/usePermission";
import { formatRequired } from "@lib/utils.server";

export default async function handler(req: IRequest, res: NextApiResponse) {
  try {
    await useAuth(req);
  } catch (e) {
    return res.status(e?.code ?? 400).json({
      status: "error",
      error: e,
    });
  }

  try {
    await usePermission(req, ["dispatch", "leo"]);
  } catch (e) {
    return res.status(e?.code ?? 401).json({
      status: "error",
      error: e,
    });
  }
  switch (req.method) {
    case "PUT": {
      try {
        const { type } = req.body;

        if (!type) {
          return res.status(400).json({
            error: formatRequired(["type"], req.body),
            status: "error",
          });
        }

        let sql = "UPDATE `citizens` SET ";
        switch (type) {
          case "dmv": {
            sql += "`dmv` = ?";
            break;
          }
          case "ccw": {
            sql += "`ccw` = ?";
            break;
          }
          case "pilot_license": {
            sql += "`pilot_license` = ?";

            break;
          }
          case "fire_license": {
            sql += "`fire_license` = ?";
            break;
          }
          default: {
            return res.json({
              error: "Invalid type",
              status: "error",
            });
          }
        }

        await processQuery(sql + "WHERE `id` = ?", ["1", req.query.citizenId]);

        return res.json({ status: "success" });
      } catch (e) {
        logger.error("suspend_license", e);

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