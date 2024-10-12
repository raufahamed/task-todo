import React, { useEffect, useState } from "react";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [inputvalue, setInputValue] = useState("");
  const [undoStack, setUndoStack] = useState([]);

  function addTodo() {
    let newTask = { id: Date.now(), text: inputvalue, completed: false };
    setTodos([...todos, newTask]);
    setUndoStack([...undoStack, { type: "ADD", todo: newTask }]);
    setInputValue("");
  }

  function deleteTodo(id) {
    const todostoDelete = todos.find((todo) => todo.id === id);
    console.log(todostoDelete, "delete");
    if (todostoDelete) {
      const remove = todos.filter((todo) => todo.id !== id);
      setTodos(remove);
      setUndoStack([...undoStack, { type: "DELETE", todo: todostoDelete }]);
    }
  }

  function toggleComplete(id) {
    const updatedTasks = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTasks);
    setUndoStack([...undoStack, { type: "TOGGLE", id }]);
  }

  useEffect(() => {
    console.log("current tasks", todos);
  }, [todos]);

  function undoLastAction() {
    if (undoStack.length === 0) return;
    const LastAction = undoStack[undoStack.length - 1];
    console.log(LastAction);

    setUndoStack(undoStack.slice(0, -1));

    switch (LastAction.type) {
      case "ADD":
        setTodos(todos.filter((todo) => todo.id !== LastAction.todo.id));
        break;
      case "TOGGLE":
        toggleComplete(LastAction.id);
        break;
      case "DELETE":
        setTodos([...todos, LastAction.todo]);
        console.log(LastAction.todo);
        break;
      default:
        break;
    }
  }

  return (
    <div>
      <input
        type="text"
        value={inputvalue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="add a new task"
      />
      <button onClick={addTodo}>add</button>
      <button onClick={undoLastAction} disabled={undoStack.length === 0}>
        undo
      </button>
      {todos.map((todo) => (
        <div key={todo.id}>
          <p
            style={{
              textDecoration: todo.completed ? "line-through" : "none",
            }}
          >
            {todo.text}
          </p>
          <button onClick={() => toggleComplete(todo.id)}>completed</button>
          <button onClick={() => deleteTodo(todo.id)}>delete</button>
        </div>
      ))}
    </div>
  );
}

export default TodoList;
