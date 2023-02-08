import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useParams, useNavigate } from 'react-router-dom';

import {
  Card,
  CardContent,
  Typography,
  Button,
  FormControlLabel,
  Checkbox,
  CardActionArea,
  FormGroup,
  TextField,
} from '@mui/material';

//use params the endpoint for id url
//then make a fetch request for all project/task info
//display task info

//TODO: connect to router first

const Project = ({ projectId, projectName, projectDescription }) => {
  // const initalState = undefined;
  // const { userID, projectID } = useParams();
  const [addusers, setAddUsers] = useState({
    email: '',
    project: projectId,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (addusers.email === '') return;
    fetch('', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(addusers),
    })
      .then((res) => res.json())
      .then((results) => {
        console.log('just added user to project: ', results);
      });
  };

  //waiting for mark to make controller
  // useEffect(() => {}, []);
  // console.log('project;', projectInfo);
  // console.log('project.project');

  return (
    <div className="projectContainer">
      {/* dummy */}

      <Card sx={{ minWidth: 200 }}>
        {/* this should be a dynamically created title*/}
        <CardContent>
          <CardActionArea
            component={RouterLink}
            to={`/project/${projectId}`}
            // below line is attempting to display project name in task container
            state={{ projectName, projectDescription }}
            //
          >
            <h3>{projectName}</h3>
          </CardActionArea>
          <Typography variant="h5" component="div">
            {projectDescription}
            {/* why so ugly */}
          </Typography>
          <hr />
          {/* im guessing with properties */}
          <FormGroup row>
            <TextField
              label="Add user to project"
              variant="outlined"
              sx={{ width: 400, height: 100 }}
              placeholder="Enter user email"
              onChange={(e) =>
                setAddUsers({
                  ...addusers,
                  email: e.target.value,
                })
              }
            />
            <Button onClick={handleSubmit} style={{ height: 56 }}>
              +
            </Button>
          </FormGroup>
        </CardContent>
      </Card>
    </div>
  );
};

export default Project;
