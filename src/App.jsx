import { useEffect, useState } from "react"
import AddTask from "./components/AddTask";
import Tasks from "./components/Tasks";
import { v4 } from "uuid";
import Title from "./components/Title";



function App() {
  // ▼▼▼ CORREÇÃO AQUI ▼▼▼
  // A lista de tarefas agora é o valor padrão (o "OU")
  // se o localStorage.getItem("tasks") retornar nulo.
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || [
      {
        id: 1,
        title: "Estudar programação",
        description: "Estudar programação para se tornar um desenvolvedor full stack",
        IsCompleted: false,
      },
      {
        id: 2,
        title: "Estudar inglês",
        description: "Estudar inglês para se tornar fluente",
        IsCompleted: false,
      },
      {
        id: 3,
        title: "Estudar matemática",
        description: "Estudar matemática para se tornar um desenvolvedor full stack",
        IsCompleted: false,
      },
    ]
  );
  // ▲▲▲ FIM DA CORREÇÃO ▲▲▲


  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks]);

  useEffect(() => {
    const fetchTasks = async () => {


      // CHAMAR A API
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos?_limit=10",
        {
          method: 'GET',
        }
      );


      // PEGAR OS DADOS QUE ELA RETORNA
      const data = await response.json()
      // ARMAZENAR/PERSISTIR ESSES DADOS NO STATE
      setTasks(data);
    };
    // SE QUISER, VOCÊ PODE CHAMAR UMA API PARA PEGAR AS TAREFAS
    //fetchTasks();
  }, []);

  function onTaskClick(taskId) {
    const newTasks = tasks.map(task => {
      //PRECISO ATUALIZAR ESSA TAREFA
      if (task.id === taskId) {
        return { ...task, IsCompleted: !task.IsCompleted };
      }
      return task;

    });

    setTasks(newTasks);

  }
  function onDeleteTaskClick(taskId) {
    const newTasks = tasks.filter(task => task.id !== taskId)
    setTasks(newTasks);
  }

  function onAddTaskSubmit(title, description) {
    const newTask = {
      id: v4(),
      title,
      description,
      IsCompleted: false,
    };
    setTasks([...tasks, newTask])
  }
  return (

    <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
      <div className="w-[500px] space-y-4">

        <Title>

          Gerenciador de Tarefas

        </Title>
        <AddTask onAddTaskSubmit={onAddTaskSubmit} />
        <Tasks
          tasks={tasks}
          onTaskClick={onTaskClick}
          onDeleteTaskClick={onDeleteTaskClick} />
      </div>


    </div>
  );
}

export default App;
