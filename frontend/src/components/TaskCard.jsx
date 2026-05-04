export default function TaskCard({ task, onStatusChange, isAdmin, onDelete }) {
  const overdue = task.status !== 'done' && new Date(task.dueDate) < new Date();

  return (
    <div className={`bg-white rounded-xl shadow p-5 border ${overdue ? 'border-red-400' : 'border-transparent'}`}>
      <div className="flex justify-between gap-3">
        <h3 className="font-bold text-slate-800">{task.title}</h3>
        {overdue && <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">Overdue</span>}
      </div>
      <p className="text-sm text-slate-600 mt-2">{task.description}</p>
      <p className="text-sm mt-3"><b>Project:</b> {task.projectId?.title || 'N/A'}</p>
      <p className="text-sm"><b>Assigned:</b> {task.assignedTo?.name || 'N/A'}</p>
      <p className="text-sm"><b>Due:</b> {new Date(task.dueDate).toLocaleDateString()}</p>
      <div className="flex gap-2 mt-4">
        <select
          value={task.status}
          onChange={(e) => onStatusChange(task._id, e.target.value)}
          className="border rounded-lg px-3 py-2 text-sm flex-1"
        >
          <option value="todo">Todo</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
        {isAdmin && <button onClick={() => onDelete(task._id)} className="bg-red-500 text-white px-3 rounded-lg">Delete</button>}
      </div>
    </div>
  );
}
