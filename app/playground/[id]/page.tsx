"use client";

import React , {useCallback, useEffect, useState, useMemo, useRef, useReducer} from "react";
import { useParams } from "next/navigation";
import { usePlayground } from "@/modules/playground/hooks/usePlayground";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Header } from "@/modules/home/header";
import { Separator } from "@radix-ui/react-separator";
import { TemplateFileTree } from "@/modules/playground/components/playground-explorer";
import { useFileExplorer } from "@/modules/playground/hooks/useFileExplorer";
import { TemplateFile } from "@/modules/playground/lib/page-to-json";


const MainPlaygroundPage = () => {
  
  const { id } = useParams<{ id: string }>();
  const { playgroundData, templateData, isLoading, error, saveTemplateData } =
    usePlayground(id);

  const {
     setTemplateData,
     setActiveFileId,
     setPlaygroundId,
     setOpenFiles,
       activeFileId,
       closeAllFiles,
       openFile,
       openFiles

  } = useFileExplorer(); 
  

  useEffect(() => {setPlaygroundId(id)}, [id, setPlaygroundId]);
  useEffect(() => {
    if (templateData &&  !openFiles.length) {
      setTemplateData(templateData);
    }
  }, [templateData, setTemplateData, openFiles.length]);


  const activeFile = openFiles.find((file) => file.id === activeFileId);
  const hasUnsavedChanges = openFiles.some((file) => file.hasUnsavedChanges);

  const handleFileSelect = (file:TemplateFile)=>{
    openFile(file);
  };
  

 
 

  return (
    <TooltipProvider>
      <>
        <TemplateFileTree
          data={templateData!}
          onFileSelect={handleFileSelect}
          selectedFile={activeFile}
          title="File Explorer"
          onAddFile={() => {}}
          onAddFolder={() => {}}
          onDeleteFile={() => {}}
          onDeleteFolder={() => {}}
          onRenameFile={() => {}}
          onRenameFolder={() => {}}
        />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
          </header>

          <div className="flex flex-1 items-center gap-2">
            <div className="felx flex-col flex-1">
              <h1 className="text-sm font-medium">
                {playgroundData?.title || "Code Playground"}
              </h1>
            </div>
          </div>
        </SidebarInset>
      </>
    </TooltipProvider>
  );
};
export default MainPlaygroundPage;



