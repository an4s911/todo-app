import { useState, useEffect } from "react";
import { FaCheck } from "react-icons/fa6";
import DarkToggle from "./DarkToggle";

function Checkbox({ isChecked, handleCheck }) {
    return (
        <div
            onClick={() => handleCheck()}
            className={
                "checkbox rounded-full h-6 w-6 flex justify-center items-center" +
                (isChecked
                    ? " border-none bg-blue-400"
                    : " border-dashed border-gray-500 border-[1px] animate-spin-slow")
            }
        >
            {isChecked && <FaCheck className="text-white" />}
            <input
                readOnly
                type="checkbox"
                checked={isChecked}
                className="hidden"
            />
        </div>
    );
}

function TodoItem({ id, todos, handleDelete, handleCheck }) {
    const [todo, setTodo] = useState(todos.find((todo) => todo.id === id));
    const [isChecked, setIsChecked] = useState(todo.checked);

    const handleLocalCheck = () => {
        setIsChecked(!isChecked);
        handleCheck(todo.id, !isChecked);
    };

    return (
        <div className={"todo-item" + (isChecked ? " checked" : "")}>
            <Checkbox isChecked={isChecked} handleCheck={handleLocalCheck} />
            <div className="todo-text">{todo.name}</div>
            <div
                onClick={() => handleDelete(todo.id)}
                className="delete cursor-pointer no-underline"
            >
                ✕
            </div>
        </div>
    );
}

export default function TodoList() {
    const [todos, setTodos] = useState([]);
    const [currentFilter, setCurrentFilter] = useState("all");

    const handleAdd = (e) => {
        e.preventDefault();

        const inputElement = e.target[0];
        const name = inputElement.value;
        inputElement.value = "";

        // Get the largest id in the array
        const largestId =
            todos.length === 0 ? 0 : Math.max(...todos.map((todo) => todo.id));
        setTodos([...todos, { id: largestId + 1, name, checked: false }]);

        inputElement.focus();
    };

    const handleClearCompleted = () => {
        setTodos(todos.filter((todo) => !todo.checked));
    };

    const calcItemsLeft = () => {
        let itemsLeft = 0;
        todos.forEach((todo) => {
            if (!todo.checked) {
                itemsLeft++;
            }
        });
        return itemsLeft;
    };

    const handleCheck = (id, newCheckedValue) => {
        setTodos(
            todos.map((todo) => {
                if (todo.id === id) {
                    return { ...todo, checked: newCheckedValue };
                }
                return todo;
            }),
        );
    };

    const handleDelete = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    const handleFilter = (filter) => {
        setCurrentFilter(filter);
    };

    return (
        <div className="absolute left-0 top-0 h-full w-full flex flex-col md:gap-12 items-center mt-32 md:mt-24 px-8 md:px-16 lg:px-48 xl:px-96">
            <div className="header flex items-center justify-between text-white gap-36 w-full">
                <h1 className="title text-4xl font-bold tracking-widest pt-2">
                    TODO
                </h1>
                <DarkToggle size={24} />
            </div>
            <div className="todolist-wrapper">
                <div className="new-todo">
                    <Checkbox isChecked={false} />
                    <form onSubmit={handleAdd}>
                        <input
                            className="bg-transparent"
                            type="text"
                            placeholder="Create a new todo..."
                        />
                    </form>
                </div>
                <div className="todo-list">
                    {todos
                        .filter(
                            (todo) =>
                                currentFilter === "all" ||
                                (currentFilter === "active" && !todo.checked) ||
                                (currentFilter === "completed" && todo.checked),
                        )
                        .map((todo) => {
                            return (
                                <TodoItem
                                    key={todo.id}
                                    id={todo.id}
                                    todos={todos}
                                    handleDelete={handleDelete}
                                    handleCheck={handleCheck}
                                />
                            );
                        })}

                    <div className="todo-info">
                        <div className="left">
                            {calcItemsLeft()} item(s) left
                        </div>
                        <div
                            onClick={handleClearCompleted}
                            className="clear cursor-pointer active:text-red-500"
                        >
                            Clear completed
                        </div>
                    </div>
                </div>
                <div className="todo-filter">
                    <div
                        className={
                            "all" + (currentFilter === "all" ? " current" : "")
                        }
                        onClick={() => handleFilter("all")}
                    >
                        All
                    </div>
                    <div
                        className={
                            "active" +
                            (currentFilter === "active" ? " current" : "")
                        }
                        onClick={() => handleFilter("active")}
                    >
                        Active
                    </div>
                    <div
                        className={
                            "completed" +
                            (currentFilter === "completed" ? " current" : "")
                        }
                        onClick={() => handleFilter("completed")}
                    >
                        Completed
                    </div>
                </div>
            </div>
        </div>
    );
}
