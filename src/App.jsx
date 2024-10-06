import { useEffect, useState } from 'react'

import { ToDoProvider } from './context'
import ToDoForm from './components/ToDoForm'
import TodoItem from './components/ToDoItem'

function App() {
  const [todos, setTodos] = useState([])


   const addToDo = (todo) => {
    setTodos((prev) => [{id: Date.now(),...todo}, ...prev])
   }

    const updateToDo = (id, todo) => {
      setTodos((prev) => prev.map((prevToDo) => (prevToDo.id === id ? todo : prevToDo)))
    }


    const toggleComplete = (id) => {
      setTodos((prev) => prev.map((prevToDo) => prevToDo.id === id ? {...prevToDo, completed: !prevToDo.completed} :prevToDo))
    }
   

    const deleteToDo = (id) => {
      setTodos((prev) => prev.filter((todo) => todo.id !== id))
    }


    useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))
    if (todos && todos.length > 0){
      setTodos(todos)
    }
    }, [])


    useEffect(() => {
      localStorage.setItem("todos", JSON.stringify(todos))
    }, [todos])
  return (
    <ToDoProvider value={{todos, addToDo, updateToDo, deleteToDo, toggleComplete}}>
    <div className="bg-[#172842] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Your Own ToDo List</h1>
                    <div className="mb-4">
                        <ToDoForm />
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                       {todos.map((todo) => (
                          <div key={todo.id} className='w-full'>
                            <TodoItem todo={todo} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
    </ToDoProvider>
  )
}

export default App
