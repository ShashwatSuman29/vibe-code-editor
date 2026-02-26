"use client";
import { useRef, useEffect, useCallback } from "react";
import Editor, { type Monaco } from "@monaco-editor/react";
import { TemplateFile } from "../lib/page-to-json";
import type { editor } from "monaco-editor";

import {
  configureMonaco,
  defaultEditorOptions,
  getEditorLanguage,
} from "../lib/editor-config";

interface PlaygroundEditorProps {
  activeFile: TemplateFile | undefined;
  content: string;
  onContentChange: (value: string) => void;
}
const PlaygroundEditor = ({
  activeFile,
  content,
  onContentChange,
}: PlaygroundEditorProps) => {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  const monacoRef = useRef<Monaco | null>(null);

 const handleEditorDidMount = (
  editorInstance: editor.IStandaloneCodeEditor,
  monaco: Monaco
) => {

    editorRef.current = editorInstance;
    monacoRef.current = monaco;
    console.log("Editor instance mounted:", !!editorRef.current);

    editorInstance.updateOptions(
  defaultEditorOptions as unknown as editor.IStandaloneEditorConstructionOptions
);


    configureMonaco(monaco);

    updateEditorLanguage();
  };

  const updateEditorLanguage = () => {
    if (!activeFile || !monacoRef.current || !editorRef.current) return;

    const model = editorRef.current.getModel();
    if (!model) return;

    const language = getEditorLanguage(activeFile.fileExtension || "");
    try {
      monacoRef.current.editor.setModelLanguage(model, language);
    } catch (error) {
      console.warn(`Failed to set editor language to ${language}:`, error);
    }
  };
  useEffect(() => {
    updateEditorLanguage();
  }, [activeFile]);

  return (
    <div className="h-full relative">
      <Editor
        height="100%"
        value={content}
        onChange={(value) => onContentChange(value || "")}
        onMount={handleEditorDidMount}
        language={
          activeFile ? getEditorLanguage(activeFile.fileExtension || "") : "plaintext"
        }
        // @ts-expect-error defaultEditorOptions type mismatch with Monaco editor options
        options={defaultEditorOptions}
      />
    </div>
  );
};
export default PlaygroundEditor;
