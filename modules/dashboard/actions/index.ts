"use server";


import { currentUser } from "@/modules/auth/actions";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

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

export const createPlayground = async (data: {
  title: string;
  description: string;
  template: "REACT" | "NEXTJS" | "EXPRESS" | "VUE" | "HONO" | "ANGULAR";
}) => {
  const user = await currentUser();

  if (!user?.id) {
    throw new Error("User not authenticated");
  }

  const {template, title, description} = data;

  try {
    const playground = await db.playground.create({
      data:{
        title: title,
        description: description,
        template: template,
        UserId: user.id!
      }
    })  

    return playground;
  } catch (error) {
    console.log("Error creating playground:", error);
  }
}

export const deleteProjectById = async (id:string)=>{
  try {
    await db.playground.delete({
      where:{
        id: id,
      }
    })
    revalidatePath("/dashboard")
  } catch (error) {
    console.log("Error deleting playground:", error);
  }
}

export const editProjectById = async(id:string, data:{title:string, description:string} )=>{
  try {
    await db.playground.update({
      where:{
        id: id,
      },
      data:data
      })
    revalidatePath("/dashboard")
  } catch (error) {
    console.log("Error editing playground:", error);
  }
}

export const duplicateProjectById = async(id:string)=>{
  try {
    const originalPlayground = await db.playground.findUnique({
      where:{
        id: id
      },
      }) 
      if(!originalPlayground){
        throw new Error("Playground not found");

      } 

      const duplicatedPlayground = await db.playground.create({
        data:{
          title: `${originalPlayground.title} (Copy)`,
          description: originalPlayground.description,
          template: originalPlayground.template,
          UserId: originalPlayground.UserId,
        }
      })
      revalidatePath("/dashboard")
      return duplicatedPlayground;
  } catch (error) {
    console.log("Error duplicating playground:", error);
  }
}