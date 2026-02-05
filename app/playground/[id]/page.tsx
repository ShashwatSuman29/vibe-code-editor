"use client";
import React from "react";
import { useParams } from "next/navigation";
import { usePlayground } from "@/modules/playground/hooks/usePlayground";

const MainPlaygroundPage = () => {
  const { id } = useParams<{ id: string }>();
const {playgroundData, templateData, isLoading, error, saveTemplateData} = usePlayground(id);
 console.log ("Playground Data:", playgroundData)
 console.log ("Template Data:", templateData)
 console.log ("Is Loading:", isLoading)
 console.log ("Error:", error)
 console.log ("Save Template Data:", saveTemplateData)



  return <div> Params : {id} </div>;
};

export default MainPlaygroundPage;
