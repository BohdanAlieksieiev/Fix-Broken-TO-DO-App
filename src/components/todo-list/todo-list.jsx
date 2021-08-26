import * as React from 'react';
import { Checkbox } from '../checkbox';
import { TodosContext } from '../../todo-context';
import './todo-list.scss';

export const TodoList = () => {
  const { todos, setTodos } = React.useContext(TodosContext);
  const [checkedTodos, setCheckedTodos] = React.useState([]);

  const updateChecks = (id) => {
    const updateCheckedTodos = checkedTodos.map((item) => {
      if (item < id) {
        return item;
      }

      if (item > id) {
        return item - 1;
      }

      return null;
    });
    setCheckedTodos(updateCheckedTodos);
  };

  const handleDelete = (id) => {
    // Fix an ability to delete task
    setTodos(todos.filter((element, index) => index !== id));
    updateChecks(id);
  };

  const toggleCheck = (id) => {
    // Fix an ability to toggle task
    if (checkedTodos.find((checkedTodo) => checkedTodo === id) !== undefined) {
      setCheckedTodos(checkedTodos.filter((element) => element !== id));
    } else {
      const checkedTodosWithNewItem = [
        ...checkedTodos,
        id,
      ];
      setCheckedTodos(checkedTodosWithNewItem);
    }
  };

  const handleKeyUp = (e, id) => {
    if (e.keyCode === 13) {
      toggleCheck(id);
    }
  };

  const isNumber = (number) => /^-?[\d.]+(?:e-?\d+)?$/.test(number);

  return (
    <div className="todo-list">
      <span className="todo-list-title">Things to do:</span>
      {todos.length ? (
        <div className="todo-list-content">
          {todos.map((todoItem, indexItem) => (
            <Checkbox
              key={todoItem}
              label={todoItem}
              checked={isNumber(
                checkedTodos.find((checkedTodo) => checkedTodo === indexItem),
              )}
              onClick={() => toggleCheck(indexItem)}
              onKeyUp={(e) => handleKeyUp(e, indexItem)}
              onDelete={() => handleDelete(indexItem)}
            />
          ))}
        </div>
      ) : (
        <div className="no-todos">Looks like you&apos;re absolutely free today!</div>
      )}
    </div>
  );
};
