import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import TaskCard from '../components/TaskCard.jsx';
import { TextField, FormGroup, Button, Typography } from '@mui/material';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const TasksContainer = () => {
  const { project } = useParams();
  let { state } = useLocation();

  const initialColumns = {
    // card =
    todo: {
      id: 'todo',
      list: [],
    },
    doing: {
      id: 'doing',
      list: [],
    },
    done: {
      id: 'done',
      list: [],
    },
  };

  const [columns, setColumns] = useState(initialColumns);

  const [cards, setTaskCards] = useState([]); //taskcards = []
  const [userInput, setUserInput] = useState({
    name: '',
    description: '',
    project: project,
  });

  //add a task to project
  const handleSubmit = (e) => {
    console.log('userinput:', userInput);
    e.preventDefault();
    // if (!taskInput) return;
    //post request to add task to db
    fetch('http://localhost:3000/project/list', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(userInput),
    })
      .then((res) => res.json())
      .then((results) => {
        console.log('created new task res', results);
      })
      .then(setTaskCards([...cards, userInput]));
  };
  //useEffect; makes a fetch request to get tasks
  useEffect(() => {
    console.log('tasks container mounted', project); //typeof proj :string
    fetch(`http://localhost:3000/project/list/${project}`, {
      method: 'GET',
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((results) => {
        console.log('got the tsks goods', results);
        const tasksArr = results.toDos;
        setTaskCards([...tasksArr]);
      });
  }, []);

  function handleOnDragEnd(result) {
    console.log('handleONDRAGEND: ', result);
    const newCards = Array.from(cards);
    const [reorderedCard] = newCards.splice(result.source.index, 1);
    newCards.splice(result.destination.index, 0, reorderedCard);
    console.log(newCards);
    setTaskCards(newCards);
  }

  return (
    <div id="taskContainer">
      <header className="cardHeader">
        <h1>{state.projectName}</h1>
      </header>
      <Typography variant="h5" component="div">
        {state.projectDescription}
      </Typography>
      <div className="cardInput">
        <FormGroup row>
          <TextField
            label="Add New Task"
            variant="outlined"
            sx={{ width: 400, height: 100 }}
            placeholder="Add Task"
            onChange={(e) =>
              setUserInput({
                ...userInput,
                name: e.target.value,
              })
            }
          />
          <TextField
            label="Add New Task Description"
            variant="outlined"
            sx={{ width: 400, height: 100 }}
            placeholder="Add Description"
            onChange={(e) =>
              setUserInput({
                ...userInput,
                description: e.target.value,
              })
            }
          />
          <Button onClick={handleSubmit} style={{ height: 56 }}>
            +
          </Button>
        </FormGroup>
      </div>
      <hr />
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <div className="cardGrid">
          <div>
            <h2>To Do</h2>
            <Droppable droppableId="todo" type="column">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {cards.map((card, i) => (
                    <TaskCard key={i} card={card} index={i} />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
          <div>
            <h2>Doing</h2>
            <Droppable droppableId="doing" type="column">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </div>
      </DragDropContext>
    </div>
  );
};

export default TasksContainer;
