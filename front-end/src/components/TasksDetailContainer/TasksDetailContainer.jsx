import { useEffect, useState } from 'react';
import TasksDetail from '../TasksDetail/TasksDetail';

const TasksDetailContainer = () => {
    const [tasks, setTasks] = useState(null);

    useEffect(() => {
        // Simula una llamada a la base de datos
        const fetchTasks = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/tasks'); // Reemplaza con tu endpoint real
                const data = await response.json();
                setTasks(data);
            } catch (error) {
                console.error('Error al obtener las tareas:', error);
            }
        };

        fetchTasks();
    }, []);

    return (
        <div>
            {tasks.length > 0 ? (
                tasks.map((task) => <TasksDetail key={task.id} task={task} />)
            ) : (
                <p>Cargando tareas...</p>
            )}
        </div>
    );
};

export default TasksDetailContainer;