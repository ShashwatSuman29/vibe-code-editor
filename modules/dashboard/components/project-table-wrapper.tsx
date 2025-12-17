"use client";

import ProjectTable from "./project-table";
import {
  deleteProjectById,
  editProjectById,
  duplicateProjectById,
} from "@/modules/dashboard/actions";
import type { Project } from "../types";

export default function ProjectTableWrapper({
  projects,
}: {
  projects: Project[];
}) {
  return (
    <ProjectTable
      projects={projects}
      onDeleteProject={async (id) => {
        await deleteProjectById(id);
      }}
      onUpdateProject={async (id, data) => {
        await editProjectById(id, data);
      }}
      onDuplicateProject={async (id) => {
        await duplicateProjectById(id);
      }}
    />
  );
}
