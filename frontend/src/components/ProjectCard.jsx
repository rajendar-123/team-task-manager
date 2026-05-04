export default function ProjectCard({ project }) {
  return (
    <div className="bg-white rounded-xl shadow p-5">
      <h3 className="font-bold text-slate-800">{project.title}</h3>
      <p className="text-sm text-slate-600 mt-2">{project.description}</p>
      <p className="text-sm mt-3 text-slate-500">Members: {project.teamMembers?.length || 0}</p>
    </div>
  );
}
