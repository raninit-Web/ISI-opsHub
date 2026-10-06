
import { useState } from 'react'
import {
  LayoutDashboard,
  ClipboardList,
  Users,
  Bell,
  Settings,
  Plus,
  Pencil,
  Trash2,
  Play,
  Check,
  RotateCcw,
  X,
  CalendarDays,
  UserRound,
  CircleAlert
} from 'lucide-react'

import isiLogo from './assets/Logo_ISI_School.png'
import './App.css'

function App() {
  const [activePage, setActivePage] = useState('Dashboard')

  const [tasks, setTasks] = useState([])

  const [showForm, setShowForm] = useState(false)
  const [editingTask, setEditingTask] = useState(null)

  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    assigned: 'IT Staff',
    dueDate: ''
  })

  // =========================
  // ADD TASK
  // =========================

  const handleAddTask = (e) => {
    e.preventDefault()

    if (!newTask.title.trim()) {
      alert('Please enter a task title.')
      return
    }

    const task = {
      id: Date.now(),
      title: newTask.title,
      description: newTask.description,
      priority: newTask.priority,
      status: 'Pending',
      assigned: newTask.assigned,
      dueDate: newTask.dueDate
    }

    setTasks([...tasks, task])

    resetForm()
  }

  // =========================
  // DELETE TASK
  // =========================

  const handleDeleteTask = (id) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this task?'
    )

    if (!confirmed) return

    setTasks(tasks.filter(task => task.id !== id))
  }

  // =========================
  // CLEAR ALL TASKS
  // =========================

  const handleClearAll = () => {
    if (tasks.length === 0) return

    const confirmed = window.confirm(
      'Are you sure you want to clear all tasks?'
    )

    if (!confirmed) return

    setTasks([])
  }

  // =========================
  // CHANGE STATUS
  // =========================

  const handleStatusChange = (id) => {
    setTasks(
      tasks.map(task => {
        if (task.id !== id) return task

        if (task.status === 'Pending') {
          return {
            ...task,
            status: 'In Progress'
          }
        }

        if (task.status === 'In Progress') {
          return {
            ...task,
            status: 'Completed'
          }
        }

        return {
          ...task,
          status: 'Pending'
        }
      })
    )
  }

  // =========================
  // EDIT TASK
  // =========================

  const handleEditTask = (task) => {
    setEditingTask(task)

    setNewTask({
      title: task.title,
      description: task.description,
      priority: task.priority,
      assigned: task.assigned,
      dueDate: task.dueDate
    })

    setShowForm(true)
  }

  // =========================
  // UPDATE TASK
  // =========================

  const handleUpdateTask = (e) => {
    e.preventDefault()

    if (!newTask.title.trim()) {
      alert('Please enter a task title.')
      return
    }

    setTasks(
      tasks.map(task => {
        if (task.id === editingTask.id) {
          return {
            ...task,
            title: newTask.title,
            description: newTask.description,
            priority: newTask.priority,
            assigned: newTask.assigned,
            dueDate: newTask.dueDate
          }
        }

        return task
      })
    )

    resetForm()
  }

  // =========================
  // RESET FORM
  // =========================

  const resetForm = () => {
    setNewTask({
      title: '',
      description: '',
      priority: 'Medium',
      assigned: 'IT Staff',
      dueDate: ''
    })

    setEditingTask(null)
    setShowForm(false)
  }

  // =========================
  // STATISTICS
  // =========================

  const totalTasks = tasks.length

  const pendingTasks = tasks.filter(
    task => task.status === 'Pending'
  ).length

  const progressTasks = tasks.filter(
    task => task.status === 'In Progress'
  ).length

  const completedTasks = tasks.filter(
    task => task.status === 'Completed'
  ).length

  // =========================
  // PROGRESS
  // =========================

  const progressPercentage =
    totalTasks === 0
      ? 0
      : Math.round((completedTasks / totalTasks) * 100)

  // =========================
  // NAVIGATION
  // =========================

  const navigateTo = (page) => {
    setActivePage(page)
  }

  // =========================
  // TASK CARD
  // =========================

  const renderTaskCard = (task) => {
    return (
      <div className="task-card" key={task.id}>

        <div className="task-info">

          <div className="task-title-row">

            <h3>{task.title}</h3>

            <span
              className={`priority-badge ${task.priority.toLowerCase()}`}
            >
              {task.priority}
            </span>

          </div>

          <p>{task.description}</p>

          <div className="task-details">

            <span>
              <CircleAlert size={13} />
              Status: {task.status}
            </span>

            <span>
              <UserRound size={13} />
              Assigned: {task.assigned}
            </span>

            <span>
              <CalendarDays size={13} />
              Due: {task.dueDate || 'Not set'}
            </span>

          </div>

        </div>

        <div className="task-actions">

          <button
            onClick={() => handleEditTask(task)}
            title="Edit Task"
          >
            <Pencil size={14} />
            Edit
          </button>

          <button
            onClick={() => handleStatusChange(task.id)}
            title="Change Status"
          >
            {task.status === 'Pending' ? (
              <>
                <Play size={14} />
                Start
              </>
            ) : task.status === 'In Progress' ? (
              <>
                <Check size={14} />
                Complete
              </>
            ) : (
              <>
                <RotateCcw size={14} />
                Reset
              </>
            )}
          </button>

          <button
            onClick={() => handleDeleteTask(task.id)}
            title="Delete Task"
          >
            <Trash2 size={14} />
            Delete
          </button>

        </div>

      </div>
    )
  }

  // =========================
  // DASHBOARD
  // =========================

  const renderDashboard = () => {
    return (
      <>
        <header className="header">

          <div>
            <h1>Dashboard</h1>

            <p>
              ISI IT Task Management
            </p>
          </div>

          <button
            className="add-task-btn"
            onClick={() => {
              setEditingTask(null)
              setShowForm(true)
            }}
          >
            <Plus size={17} />
            Add Task
          </button>

        </header>

        {/* STATS */}

        <section className="stats">

          <div className="stat-card">
            <h3>Total Tasks</h3>
            <strong>{totalTasks}</strong>
          </div>

          <div className="stat-card">
            <h3>Pending</h3>
            <strong>{pendingTasks}</strong>
          </div>

          <div className="stat-card">
            <h3>In Progress</h3>
            <strong>{progressTasks}</strong>
          </div>

          <div className="stat-card">
            <h3>Completed</h3>
            <strong>{completedTasks}</strong>
          </div>

        </section>

        {/* PROGRESS */}

        <section className="progress-section">

          <div className="progress-header">

            <div>
              <h2>Task Progress</h2>

              <p>
                Track your completed tasks
              </p>
            </div>

            <strong>
              {progressPercentage}%
            </strong>

          </div>

          <div className="progress-bar">

            <div
              className="progress-fill"
              style={{
                width: `${progressPercentage}%`
              }}
            ></div>

          </div>

          <p className="progress-text">
            {completedTasks} of {totalTasks} tasks completed
          </p>

        </section>

        {/* RECENT TASKS */}

        <section className="tasks-section">

          <div className="tasks-header">

            <div>
              <h2>Tasks</h2>

              <p>
                Manage ISI IT department tasks
              </p>
            </div>

            <button
              className="view-all-btn"
              onClick={() => navigateTo('Tasks')}
            >
              View All
            </button>

          </div>

          {tasks.length === 0 ? (

            <div className="empty-state">

              <h3>No Tasks</h3>

              <p>
                Create your first task.
              </p>

              <button
                className="add-task-btn"
                onClick={() => setShowForm(true)}
              >
                <Plus size={17} />
                Add Task
              </button>

            </div>

          ) : (

            tasks.slice(0, 3).map(renderTaskCard)

          )}

        </section>
      </>
    )
  }

  // =========================
  // TASKS PAGE
  // =========================

  const renderTasks = () => {
    return (
      <>
        <header className="header">

          <div>
            <h1>Tasks</h1>

            <p>
              Manage all ISI IT tasks
            </p>
          </div>

          <div className="header-actions">

            <button
              className="clear-btn"
              onClick={handleClearAll}
            >
              <Trash2 size={15} />
              Clear All
            </button>

            <button
              className="add-task-btn"
              onClick={() => {
                setEditingTask(null)
                setShowForm(true)
              }}
            >
              <Plus size={17} />
              Add Task
            </button>

          </div>

        </header>

        {/* TRACKING */}

        <section className="tracking-tabs">

          <button className="tracking-tab active">
            <ClipboardList size={15} />
            All Tasks
            <span>{totalTasks}</span>
          </button>

          <button className="tracking-tab">
            Pending
            <span>{pendingTasks}</span>
          </button>

          <button className="tracking-tab">
            In Progress
            <span>{progressTasks}</span>
          </button>

          <button className="tracking-tab">
            Completed
            <span>{completedTasks}</span>
          </button>

        </section>

        <section className="tasks-section">

          {tasks.length === 0 ? (

            <div className="empty-state">

              <h3>No Tasks Available</h3>

              <p>
                Your task list is empty.
              </p>

              <button
                className="add-task-btn"
                onClick={() => setShowForm(true)}
              >
                <Plus size={17} />
                Add Task
              </button>

            </div>

          ) : (

            tasks.map(renderTaskCard)

          )}

        </section>
      </>
    )
  }

  // =========================
  // TEAM
  // =========================

  const renderTeam = () => {
    return (
      <>
        <header className="header">

          <div>
            <h1>Team</h1>

            <p>
              ISI IT Department
            </p>
          </div>

        </header>

        <section className="empty-state">

          <h3>IT Team</h3>

          <p>
            Team management will be connected
            to the task assignment system.
          </p>

        </section>
      </>
    )
  }

  // =========================
  // NOTIFICATIONS
  // =========================

  const renderNotifications = () => {
    return (
      <>
        <header className="header">

          <div>
            <h1>Notifications</h1>

            <p>
              Task activity notifications
            </p>
          </div>

        </header>

        <section className="empty-state">

          <h3>No New Notifications</h3>

          <p>
            Task notifications will appear here.
          </p>

        </section>
      </>
    )
  }

  // =========================
  // SETTINGS
  // =========================

  const renderSettings = () => {
    return (
      <>
        <header className="header">

          <div>
            <h1>Settings</h1>

            <p>
              ISI OpsHub settings
            </p>
          </div>

        </header>

        <section className="empty-state">

          <h3>Application Settings</h3>

          <p>
            Settings will be connected later.
          </p>

        </section>
      </>
    )
  }

  // =========================
  // PAGE
  // =========================

  const renderPage = () => {

    if (activePage === 'Dashboard') {
      return renderDashboard()
    }

    if (activePage === 'Tasks') {
      return renderTasks()
    }

    if (activePage === 'Team') {
      return renderTeam()
    }

    if (activePage === 'Notifications') {
      return renderNotifications()
    }

    if (activePage === 'Settings') {
      return renderSettings()
    }

    return renderDashboard()
  }

  // =========================
  // RETURN
  // =========================

  return (
    <div className="app">

      {/* SIDEBAR */}

      <aside className="sidebar">

        <div className="sidebar-brand">

          <img
            src={isiLogo}
            alt="ISI School Logo"
          />

          <div>

            <h2>ISI OpsHub</h2>

            <span>
              IT Operations
            </span>

          </div>

        </div>

        <nav>

          <button
            className={
              activePage === 'Dashboard'
                ? 'nav-item active'
                : 'nav-item'
            }
            onClick={() =>
              navigateTo('Dashboard')
            }
          >
            <LayoutDashboard size={18} />
            Dashboard
          </button>

          <button
            className={
              activePage === 'Tasks'
                ? 'nav-item active'
                : 'nav-item'
            }
            onClick={() =>
              navigateTo('Tasks')
            }
          >
            <ClipboardList size={18} />
            Tasks
          </button>

          <button
            className={
              activePage === 'Team'
                ? 'nav-item active'
                : 'nav-item'
            }
            onClick={() =>
              navigateTo('Team')
            }
          >
            <Users size={18} />
            Team
          </button>

          <button
            className={
              activePage === 'Notifications'
                ? 'nav-item active'
                : 'nav-item'
            }
            onClick={() =>
              navigateTo('Notifications')
            }
          >
            <Bell size={18} />
            Notifications
          </button>

          <button
            className={
              activePage === 'Settings'
                ? 'nav-item active'
                : 'nav-item'
            }
            onClick={() =>
              navigateTo('Settings')
            }
          >
            <Settings size={18} />
            Settings
          </button>

        </nav>

        <div className="sidebar-footer">

          <p>ISI School</p>

          <span>
            IT Department
          </span>

        </div>

      </aside>

      {/* MAIN */}

      <main className="main-content">

        {renderPage()}

      </main>

      {/* MODAL */}

      {showForm && (

        <div className="modal-overlay">

          <div className="modal">

            <div className="modal-header">

              <h2>
                {editingTask
                  ? 'Edit Task'
                  : 'Add New Task'}
              </h2>

              <button
                className="close-btn"
                onClick={resetForm}
              >
                <X size={22} />
              </button>

            </div>

            <form
              onSubmit={
                editingTask
                  ? handleUpdateTask
                  : handleAddTask
              }
            >

              <label>
                Task Title
              </label>

              <input
                type="text"
                placeholder="Enter task title"
                value={newTask.title}
                onChange={e =>
                  setNewTask({
                    ...newTask,
                    title: e.target.value
                  })
                }
              />

              <label>
                Description
              </label>

              <textarea
                placeholder="Enter task description"
                value={newTask.description}
                onChange={e =>
                  setNewTask({
                    ...newTask,
                    description: e.target.value
                  })
                }
              />

              <label>
                Priority
              </label>

              <select
                value={newTask.priority}
                onChange={e =>
                  setNewTask({
                    ...newTask,
                    priority: e.target.value
                  })
                }
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>

              <label>
                Assigned To
              </label>

              <input
                type="text"
                value={newTask.assigned}
                onChange={e =>
                  setNewTask({
                    ...newTask,
                    assigned: e.target.value
                  })
                }
              />

              <label>
                Due Date
              </label>

              <input
                type="date"
                value={newTask.dueDate}
                onChange={e =>
                  setNewTask({
                    ...newTask,
                    dueDate: e.target.value
                  })
                }
              />

              <div className="form-actions">

                <button
                  type="button"
                  className="cancel-btn"
                  onClick={resetForm}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="save-btn"
                >
                  {editingTask
                    ? 'Update Task'
                    : 'Add Task'}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  )
}

export default App

