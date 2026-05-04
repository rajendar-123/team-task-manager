import { useContext, useEffect, useState } from 'react';
import api from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import TaskCard from '../components/TaskCard';
import ProjectCard from '../components/ProjectCard';

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState('all');
  const [message, setMessage] = useState('');
  const [projectForm, setProjectForm] = useState({ title: '', description: '', teamMembers: [] });
  const [taskForm, setTaskForm] = useState({ title: '', description: '', assignedTo: '', projectId: '', dueDate: '' });

  const isAdmin = user?.role === 'admin';

  const loadData = async () => {
    const taskUrl = filter === 'all' ? '/tasks' : `/tasks?status=${filter}`;
    const [taskRes, projectRes] = await Promise.all([api.get(taskUrl), api.get('/projects')]);
    setTasks(taskRes.data);
    setProjects(projectRes.data);

    if (isAdmin) {
      const userRes = await api.get('/users');
      setUsers(userRes.data);
    }
  };

  useEffect(() => {
    loadData().catch(() => setMessage('Unable to load data.'));
  }, [filter, user?.role]);

  const createProject = async (e) => {
    e.preventDefault();
    try {
      await api.post('/projects', projectForm);
      setProjectForm({ title: '', description: '', teamMembers: [] });
      setMessage('Project created successfully.');
      loadData();
    } catch (err) {
      setMessage(err.response?.data?.message || 'Project creation failed.');
    }
  };

  const createTask = async (e) => {
    e.preventDefault();
    try {
      await api.post('/tasks', taskForm);
      setTaskForm({ title: '', description: '', assignedTo: '', projectId: '', dueDate: '' });
      setMessage('Task created successfully.');
      loadData();
    } catch (err) {
      setMessage(err.response?.data?.message || 'Task creation failed.');
    }
  };

  const updateStatus = async (id, status) => {
    await api.patch(`/tasks/${id}/status`, { status });
    loadData();
  };

  const deleteTask = async (id) => {
    await api.delete(`/tasks/${id}`);
    loadData();
  };

  const completed = tasks.filter((t) => t.status === 'done').length;
  const overdue = tasks.filter((t) => t.status !== 'done' && new Date(t.dueDate) < new Date()).length;

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1">
        <Navbar />
        <div className="p-6 space-y-6">
          {message && <div className="bg-blue-100 text-blue-700 p-3 rounded-lg">{message}</div>}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-xl shadow"><p className="text-slate-500">Total Tasks</p><h2 className="text-3xl font-bold">{tasks.length}</h2></div>
            <div className="bg-white p-5 rounded-xl shadow"><p className="text-slate-500">Completed</p><h2 className="text-3xl font-bold">{completed}</h2></div>
            <div className="bg-white p-5 rounded-xl shadow"><p className="text-slate-500">Overdue</p><h2 className="text-3xl font-bold text-red-600">{overdue}</h2></div>
          </div>

          {isAdmin && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <form onSubmit={createProject} className="bg-white p-5 rounded-xl shadow space-y-3">
                <h2 className="font-bold text-lg">Create Project</h2>
                <input className="w-full border p-3 rounded-lg" placeholder="Project title" value={projectForm.title} onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })} />
                <textarea className="w-full border p-3 rounded-lg" placeholder="Description" value={projectForm.description} onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })} />
                <select multiple className="w-full border p-3 rounded-lg" value={projectForm.teamMembers} onChange={(e) => setProjectForm({ ...projectForm, teamMembers: Array.from(e.target.selectedOptions, (o) => o.value) })}>
                  {users.map((u) => <option key={u._id} value={u._id}>{u.name} - {u.role}</option>)}
                </select>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">Create Project</button>
              </form>

              <form onSubmit={createTask} className="bg-white p-5 rounded-xl shadow space-y-3">
                <h2 className="font-bold text-lg">Create Task</h2>
                <input className="w-full border p-3 rounded-lg" placeholder="Task title" value={taskForm.title} onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })} />
                <textarea className="w-full border p-3 rounded-lg" placeholder="Description" value={taskForm.description} onChange={(e) => setTaskForm({ ...taskForm, description: e.target.value })} />
                <select className="w-full border p-3 rounded-lg" value={taskForm.projectId} onChange={(e) => setTaskForm({ ...taskForm, projectId: e.target.value })}>
                  <option value="">Select project</option>
                  {projects.map((p) => <option key={p._id} value={p._id}>{p.title}</option>)}
                </select>
                <select className="w-full border p-3 rounded-lg" value={taskForm.assignedTo} onChange={(e) => setTaskForm({ ...taskForm, assignedTo: e.target.value })}>
                  <option value="">Assign to</option>
                  {users.map((u) => <option key={u._id} value={u._id}>{u.name}</option>)}
                </select>
                <input className="w-full border p-3 rounded-lg" type="date" value={taskForm.dueDate} onChange={(e) => setTaskForm({ ...taskForm, dueDate: e.target.value })} />
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">Create Task</button>
              </form>
            </div>
          )}

          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Tasks</h2>
              <select className="border p-2 rounded-lg" value={filter} onChange={(e) => setFilter(e.target.value)}>
                <option value="all">All</option>
                <option value="todo">Todo</option>
                <option value="in-progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tasks.map((task) => <TaskCard key={task._id} task={task} onStatusChange={updateStatus} isAdmin={isAdmin} onDelete={deleteTask} />)}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects.map((project) => <ProjectCard key={project._id} project={project} />)}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
