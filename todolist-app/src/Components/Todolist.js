import React, { useState, useEffect } from 'react';
import { TextField, Button, List, ListItem, ListItemText, Container, Typography, Paper } from '@mui/material';

const ToDoList = () => {
    const [task, setTask] = useState(''); 
    const [tasks, setTasks] = useState([]); 
    const [editingIndex, setEditingIndex] = useState(null); 

    
    useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        setTasks(savedTasks);
    }, []);

    
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    
    const addTask = () => {
        if (task.trim()) {
            if (editingIndex !== null) {
                
                const updatedTasks = tasks.map((t, index) => (index === editingIndex ? task : t));
                setTasks(updatedTasks);
                setEditingIndex(null); // Reset editing index
            } else {
                
                setTasks(prevTasks => [...prevTasks, task]); // Use functional update
            }
            setTask(''); 
        }
    };

   
    const startEdit = (index) => {
        setTask(tasks[index]); 
        setEditingIndex(index); 
    };


    const deleteTask = (index) => {
        const updatedTasks = tasks.filter((_, i) => i !== index); 
        setTasks(updatedTasks); 
    };

    return (
        <Container sx={{ maxWidth: 600, margin: '0 auto', padding: 4 }}>
            <Typography variant="h4" sx={{ textAlign: 'center', color: '#1976d2', mb: 3 }}>
                Simple To-Do List
            </Typography>
            <Paper elevation={3} sx={{ padding: 2, marginBottom: 3 }}>
                <TextField
                    label="New Task"
                    variant="outlined"
                    value={task}
                    onChange={(e) => setTask(e.target.value)} 
                    fullWidth
                    sx={{ mb: 2 }}
                />
                <Button variant="contained" color="primary" onClick={addTask} fullWidth>
                    {editingIndex !== null ? 'Update Task' : 'Add Task'}
                </Button>
            </Paper>
            <List sx={{ backgroundColor: '#f7f7f7', borderRadius: 1, overflow: 'hidden' }}>
                {tasks.map((t, index) => (
                    <ListItem key={index} sx={{ justifyContent: 'space-between', backgroundColor: '#ffffff', borderRadius: 1, mb: 1, boxShadow: 1 }}>
                        <ListItemText primary={t} />
                        <Button onClick={() => startEdit(index)} color="secondary">Edit</Button>
                        <Button onClick={() => deleteTask(index)} color="error">Delete</Button>
                    </ListItem>
                ))}
            </List>
        </Container>
    );
};

export default ToDoList;
