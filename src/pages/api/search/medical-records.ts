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
    await usePermission(req, ["ems_fd"]);
  } catch (e) {
    return res.status(e?.code ?? 401).json({
      status: "error",
      error: e,
    });
  }
  switch (req.method) {
    case "POST": {
      try {
        const { name } = req.body;

        if (!name) {
          return res.status(400).json({
            error: formatRequired(["name"], req.body),
            status: "error",
          });
        }

        const [
          citizen,
        ] = await processQuery("SELECT `dead`, `dead_on` FROM `citizens` WHERE `full_name` = ?", [
          name,
        ]);

        if (!citizen) {
          return res.json({
            error: "Citizen was not found",
            status: "error",
          });
        }

        const medicalRecords = await processQuery(
          "SELECT * FROM `medical_records` WHERE `name` = ?",
          [name],
        );

        if (medicalRecords.length <= 0) {
          return res.json({
            status: "error",
            error: "Citizen doesn't have any medical-records",
          });
        }

        return res.json({ status: "success", medicalRecords, citizen });
      } catch (e) {
        logger.error("search_medical_records", e);
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