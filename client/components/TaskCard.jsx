import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SubTask from './SubTask.jsx';
import { Draggable } from 'react-beautiful-dnd';
import {
  Card,
  CardContent,
  Typography,
  Button,
  CardActionArea,
} from '@mui/material';

const TaskCard = ({ card, index }, project) => {
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (!subTaskInput) return;
  //   addTasks(subTaskInput);
  // };
  // const addSubTasks = (newTask) => {
  //   setSubTasks([...cards, newTask]);
  // };

  return (
    // <Draggable key={key} draggableId={card.name} index={index}>
    //   {(provided) => (
    <div
      className="cardContainer"
      color="blue"
      // {...provided.draggableProps}
      // {...provided.dragHandleProps}
      // ref={provided.innerRef}
    >
      <Card sx={{ minWidth: 200 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            {card.name}
          </Typography>
          <Typography variant="p" component="div">
            {card.description}
          </Typography>
        </CardContent>
      </Card>
    </div>
    // )}
    // </Draggable>
  );
};

// CREATE TABLE subTask (
//   _id SERIAL PRIMARY KEY,
//   subTaskName VARCHAR(255) NOT NULL,
//   subTaskDescription TEXT NOT NULL,
//   subTaskDueDate DATE,
//   toDoListId INT NOT NULL,
//   taskId INT NOT NULL,
//   completed BOOLEAN DEFAULT false,
//   FOREIGN KEY (toDoListId) REFERENCES toDoList(_id),
//   FOREIGN KEY (taskId) REFERENCES task(_id));

export default TaskCard;
