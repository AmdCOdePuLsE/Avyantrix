'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTasks, FaPlus, FaCheck, FaEdit, FaTrash, FaClock, FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa';

interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in-progress' | 'completed';
  assignedDate: string;
  dueDate: string;
  completedDate?: string;
  userNotes?: string;
}

const TaskSection = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'in-progress' | 'completed'>('all');
  const [editingTask, setEditingTask] = useState<string | null>(null);
  const [userNotes, setUserNotes] = useState('');

  useEffect(() => {
    // Load tasks from localStorage (temporary - will be replaced with Supabase)
    const savedTasks = localStorage.getItem('userTasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    } else {
      // Demo tasks
      const demoTasks: Task[] = [
        {
          id: '1',
          title: 'Update Team Website Profile',
          description: 'Complete your profile information on the team website including bio, skills, and social links.',
          priority: 'high',
          status: 'pending',
          assignedDate: '2025-08-20',
          dueDate: '2025-08-25'
        },
        {
          id: '2',
          title: 'Review Project Documentation',
          description: 'Go through the project documentation and provide feedback on the technical specifications.',
          priority: 'medium',
          status: 'in-progress',
          assignedDate: '2025-08-21',
          dueDate: '2025-08-28'
        },
        {
          id: '3',
          title: 'Submit Monthly Report',
          description: 'Prepare and submit your monthly progress report with completed tasks and upcoming goals.',
          priority: 'medium',
          status: 'pending',
          assignedDate: '2025-08-22',
          dueDate: '2025-08-30'
        }
      ];
      setTasks(demoTasks);
      localStorage.setItem('userTasks', JSON.stringify(demoTasks));
    }
  }, []);

  const updateTask = (taskId: string, updates: Partial<Task>) => {
    const updatedTasks = tasks.map(task => 
      task.id === taskId 
        ? { ...task, ...updates, ...(updates.status === 'completed' ? { completedDate: new Date().toISOString().split('T')[0] } : {}) }
        : task
    );
    setTasks(updatedTasks);
    localStorage.setItem('userTasks', JSON.stringify(updatedTasks));
  };

  const markAsCompleted = (taskId: string, notes: string) => {
    updateTask(taskId, { 
      status: 'completed', 
      userNotes: notes,
      completedDate: new Date().toISOString().split('T')[0]
    });
    setEditingTask(null);
    setUserNotes('');
  };

  const filteredTasks = tasks.filter(task => 
    filter === 'all' || task.status === filter
  );

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-400 bg-red-600/20 border-red-500/30';
      case 'medium': return 'text-yellow-400 bg-yellow-600/20 border-yellow-500/30';
      case 'low': return 'text-green-400 bg-green-600/20 border-green-500/30';
      default: return 'text-gray-400 bg-gray-600/20 border-gray-500/30';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-400 bg-green-600/20 border-green-500/30';
      case 'in-progress': return 'text-blue-400 bg-blue-600/20 border-blue-500/30';
      case 'pending': return 'text-orange-400 bg-orange-600/20 border-orange-500/30';
      default: return 'text-gray-400 bg-gray-600/20 border-gray-500/30';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return FaCheckCircle;
      case 'in-progress': return FaClock;
      case 'pending': return FaExclamationTriangle;
      default: return FaClock;
    }
  };

  const isOverdue = (dueDate: string, status: string) => {
    if (status === 'completed') return false;
    return new Date(dueDate) < new Date();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Task Management</h1>
          <p className="text-white/70">Track and manage your assigned tasks</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-black/20 backdrop-blur-sm rounded-xl p-4 border border-red-500/20">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600/20 p-3 rounded-lg">
              <FaTasks className="text-blue-400 text-xl" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{tasks.length}</p>
              <p className="text-white/70 text-sm">Total Tasks</p>
            </div>
          </div>
        </div>

        <div className="bg-black/20 backdrop-blur-sm rounded-xl p-4 border border-red-500/20">
          <div className="flex items-center gap-3">
            <div className="bg-orange-600/20 p-3 rounded-lg">
              <FaExclamationTriangle className="text-orange-400 text-xl" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{tasks.filter(t => t.status === 'pending').length}</p>
              <p className="text-white/70 text-sm">Pending</p>
            </div>
          </div>
        </div>

        <div className="bg-black/20 backdrop-blur-sm rounded-xl p-4 border border-red-500/20">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600/20 p-3 rounded-lg">
              <FaClock className="text-blue-400 text-xl" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{tasks.filter(t => t.status === 'in-progress').length}</p>
              <p className="text-white/70 text-sm">In Progress</p>
            </div>
          </div>
        </div>

        <div className="bg-black/20 backdrop-blur-sm rounded-xl p-4 border border-red-500/20">
          <div className="flex items-center gap-3">
            <div className="bg-green-600/20 p-3 rounded-lg">
              <FaCheckCircle className="text-green-400 text-xl" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{tasks.filter(t => t.status === 'completed').length}</p>
              <p className="text-white/70 text-sm">Completed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {(['all', 'pending', 'in-progress', 'completed'] as const).map((filterOption) => (
          <motion.button
            key={filterOption}
            onClick={() => setFilter(filterOption)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              filter === filterOption
                ? 'bg-red-600 text-white'
                : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
            }`}
          >
            {filterOption.charAt(0).toUpperCase() + filterOption.slice(1).replace('-', ' ')}
          </motion.button>
        ))}
      </div>

      {/* Tasks List */}
      <div className="space-y-4">
        <AnimatePresence>
          {filteredTasks.map((task) => {
            const StatusIcon = getStatusIcon(task.status);
            const overdue = isOverdue(task.dueDate, task.status);
            
            return (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`bg-black/20 backdrop-blur-sm rounded-xl p-6 border transition-all duration-200 ${
                  overdue ? 'border-red-500/50 bg-red-900/10' : 'border-red-500/20'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className={`p-2 rounded-lg ${getStatusColor(task.status)}`}>
                      <StatusIcon />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-white">{task.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs border ${getPriorityColor(task.priority)}`}>
                          {task.priority.toUpperCase()}
                        </span>
                        {overdue && (
                          <span className="px-2 py-1 rounded-full text-xs bg-red-600/20 border border-red-500/30 text-red-400">
                            OVERDUE
                          </span>
                        )}
                      </div>
                      
                      <p className="text-white/70 mb-3">{task.description}</p>
                      
                      <div className="flex items-center gap-4 text-sm text-white/50">
                        <span>Assigned: {task.assignedDate}</span>
                        <span>Due: {task.dueDate}</span>
                        {task.completedDate && (
                          <span>Completed: {task.completedDate}</span>
                        )}
                      </div>
                      
                      {task.userNotes && (
                        <div className="mt-3 p-3 bg-white/5 rounded-lg border border-white/10">
                          <p className="text-sm text-white/80"><strong>Notes:</strong> {task.userNotes}</p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {task.status !== 'completed' && (
                      <>
                        {task.status === 'pending' && (
                          <motion.button
                            onClick={() => updateTask(task.id, { status: 'in-progress' })}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm transition-colors"
                          >
                            Start
                          </motion.button>
                        )}
                        
                        <motion.button
                          onClick={() => {
                            setEditingTask(task.id);
                            setUserNotes(task.userNotes || '');
                          }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded text-sm transition-colors"
                        >
                          Mark Complete
                        </motion.button>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
        
        {filteredTasks.length === 0 && (
          <div className="text-center py-12">
            <FaTasks className="text-4xl text-white/30 mx-auto mb-4" />
            <p className="text-white/50">No tasks found for the selected filter.</p>
          </div>
        )}
      </div>

      {/* Complete Task Modal */}
      <AnimatePresence>
        {editingTask && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setEditingTask(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-black/80 backdrop-blur-sm rounded-xl p-6 border border-red-500/20 max-w-md w-full"
            >
              <h3 className="text-lg font-semibold text-white mb-4">Complete Task</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Add completion notes (optional)
                  </label>
                  <textarea
                    value={userNotes}
                    onChange={(e) => setUserNotes(e.target.value)}
                    rows={3}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:border-red-500 resize-none"
                    placeholder="Describe what you completed, any challenges faced, or additional notes..."
                  />
                </div>
                
                <div className="flex gap-3">
                  <motion.button
                    onClick={() => setEditingTask(null)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    onClick={() => markAsCompleted(editingTask, userNotes)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    <FaCheck />
                    Complete Task
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TaskSection;
