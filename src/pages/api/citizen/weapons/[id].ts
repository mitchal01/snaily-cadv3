import { NextApiResponse } from "next";
import useAuth from "@hooks/useAuth";
import { processQuery } from "@lib/database";
import { IRequest } from "types/IRequest";
import { formatRequired, generateString } from "@lib/utils";
import { v4 } from "uuid";
import { Citizen } from "types/Citizen";

export default async function handler(req: IRequest, res: NextApiResponse) {
  const { method, query } = req;

  try {
    await useAuth(req);
  } catch (e) {
    return res.status(e?.code ?? 400).json({
      status: "error",
      error: e,
    });
  }

  switch (method) {
    case "GET": {
      const weapons = await processQuery(
        "SELECT * FROM `registered_weapons` WHERE `citizen_id` = ?",
        [query.id],
      );

      return res.json({ status: "success", weapons });
    }
    case "POST": {
      const { weapon, status, serial_number } = req.body;

      if (!weapon || !status) {
        return res.status(400).json({
          error: formatRequired(["weapon", "status"], req.body),
          status: "error",
        });
      }

      const [citizen] = await processQuery<Citizen>(
        "SELECT `full_name` FROM `citizens` WHERE `user_id` = ? AND `id` = ?",
        [req.userId, req.query.id],
      );

      if (!citizen) {
        return res.status(404).json({
          error: "Citizen was not found",
          status: "error",
        });
      }

      const id = v4();
      const serial = serial_number || generateString(10);

      await processQuery(
        "INSERT INTO `registered_weapons` (`id`, `owner`, `citizen_id`, `weapon`, `serial_number`, `status`, `user_id`) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [id, citizen.full_name, req.query.id, weapon, serial, status, req.userId],
      );

      const weapons = await processQuery(
        "SELECT * FROM `registered_weapons` WHERE `citizen_id` = ?",
        [req.query.id],
      );
      return res.json({ status: "success", weapons });
    }
    default: {
      return res.status(405).json({
        error: "Method not allowed",
        status: "error",
      });
    }
  }
}
