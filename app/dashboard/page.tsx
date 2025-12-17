import { getAllPlaygroundForUser } from "@/modules/dashboard/actions";

import AddNewButton from "@/modules/dashboard/components/add-new";
import AddRepo from "@/modules/dashboard/components/add-repo";
import EmptyState from "@/modules/dashboard/components/empty-state";
import ProjectTableWrapper from "@/modules/dashboard/components/project-table-wrapper";


type UIProject = {
  id: string;
  title: string;
  description: string;
  template: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  user: {
    id: string;
    name: string | null;
    image: string | null;
  };
  Starmark: [];
};

const Page = async () => {
  const playgrounds = await getAllPlaygroundForUser();

  const projects: UIProject[] = (playgrounds ?? []).map((p) => ({
    id: p.id,
    title: p.title,
    description: p.description ?? "",
    template: p.template,

    createdAt: p.createdAt,
    updatedAt: p.updatedAt,

    userId: p.UserId,
    user: {
      id: p.User.id,
      name: p.User.name,
      image: p.User.image,
      email: p.User.email,
      role: p.User.role,
      createdAt: p.User.createdAt,
      updatedAt: p.User.updatedAt,
    },

    Starmark: [],
  }));

  return (
    <div className="flex flex-col justify-start items-center min-h-screen mx-auto max-w-7xl px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        <AddNewButton />
        <AddRepo />
      </div>

      <div className="mt-10 flex flex-col justify-center items-center w-full">
        {projects.length === 0 ? (
          <EmptyState />
        ) : (
          <ProjectTableWrapper projects={projects} />
        )}
      </div>
    </div>
  );
};

export default Page;
