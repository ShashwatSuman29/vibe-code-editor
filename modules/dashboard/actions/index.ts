"use server";


import { currentUser } from "@/modules/auth/actions";
import { db } from "@/lib/db";

export const getAllPlaygroundForUser = async () => {
  const user = await currentUser();

  try {
    const playground = await db.playground.findMany({
      where: {
        UserId: user?.id,
      },
      include: {
        User: true,
      },
    });
    return playground;
  } catch (error) {
    console.log("Error fetching playgrounds for user:", error);
  }
};
