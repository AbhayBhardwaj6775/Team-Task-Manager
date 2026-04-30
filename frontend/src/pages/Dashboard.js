import { useEffect, useState } from "react";
import "../App.css";

export default function Dashboard() {
  const [data, setData] = useState({});
  const [projectName, setProjectName] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
  const [tasks, setTasks] = useState([]);
  const [memberId, setMemberId] = useState("");

  const token = localStorage.getItem("token");

  // Load dashboard + tasks
  const loadData = () => {
    fetch("http://localhost:5000/api/tasks/dashboard", {
      headers: { Authorization: token }
    })
      .then(res => res.json())
      .then(setData);

    fetch("http://localhost:5000/api/tasks", {
      headers: { Authorization: token }
    })
      .then(res => res.json())
      .then(setTasks);
  };

  useEffect(() => {
    loadData();
  }, [token]);

  // Create Project
  const createProject = async () => {
    if (!projectName) return alert("Enter project name");

    await fetch("http://localhost:5000/api/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify({ name: projectName })
    });

    setProjectName("");
    alert("Project created");
  };

  // Create Task
  const createTask = async () => {
    if (!taskTitle) return alert("Enter task title");

    await fetch("http://localhost:5000/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify({
        title: taskTitle,
        projectId: 1,
        assignedTo: 1
      })
    });

    setTaskTitle("");
    loadData();
  };

  // Update Task Status
  const updateStatus = async (id, status) => {
    await fetch(`http://localhost:5000/api/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify({ status })
    });

    loadData();
  };

  // 🔥 ADD MEMBER FUNCTION
  const addMember = async () => {
    if (!memberId) return alert("Enter user ID");

    try {
      const res = await fetch(
        "http://localhost:5000/api/projects/1/add-member",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token
          },
          body: JSON.stringify({ userId: memberId })
        }
      );

      const data = await res.json();

      if (data.msg) {
        alert(data.msg);
      }

      setMemberId("");

    } catch (err) {
      alert("Error adding member");
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="container">

      {/* Dashboard */}
      <div className="card">
        <h2>Dashboard</h2>

        <div className="stats">
          <div className="stat-box">Total: {data.total}</div>
          <div className="stat-box">Completed: {data.completed}</div>
          <div className="stat-box">Pending: {data.pending}</div>
          <div className="stat-box">Overdue: {data.overdue}</div>
        </div>

        <button onClick={logout} style={{ marginTop: "10px" }}>
          Logout
        </button>
      </div>

      {/* Create Project */}
      <div className="card">
        <h3>Create Project</h3>

        <input
          placeholder="Project name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />

        <button onClick={createProject}>Create</button>
      </div>

      {/* 🔥 ADD MEMBER UI */}
      <div className="card">
        <h3>Add Member to Project</h3>

        <input
          placeholder="Enter User ID"
          value={memberId}
          onChange={(e) => setMemberId(e.target.value)}
        />

        <button onClick={addMember}>Add Member</button>
      </div>

      {/* Create Task */}
      <div className="card">
        <h3>Create Task</h3>

        <input
          placeholder="Task title"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
        />

        <button onClick={createTask}>Create</button>
      </div>

      {/* Task List */}
      <div className="card">
        <h3>Tasks</h3>

        {tasks.length === 0 ? (
          <p>No tasks found</p>
        ) : (
          tasks.map((task) => (
            <div key={task.id} style={{ marginBottom: "10px" }}>
              <p><b>{task.title}</b></p>
              <p>Status: {task.status}</p>

              <button
                disabled={task.status === "todo"}
                onClick={() => updateStatus(task.id, "todo")}
              >
                Todo
              </button>

              <button
                disabled={task.status === "in-progress"}
                onClick={() => updateStatus(task.id, "in-progress")}
              >
                In Progress
              </button>

              <button
                disabled={task.status === "done"}
                onClick={() => updateStatus(task.id, "done")}
              >
                Done
              </button>
            </div>
          ))
        )}
      </div>

    </div>
  );
}