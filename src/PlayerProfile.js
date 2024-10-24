import React, { useState } from 'react';
import { Typography, Paper, Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    borderRadius: '15px', // Added rounded corners
  },
  info: {
    flexGrow: 1,
  },
  editButton: {
    marginLeft: theme.spacing(2),
    borderRadius: '20px', // Added rounded corners
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
  },
  nameInput: {
    '& .MuiOutlinedInput-root': {
      borderRadius: '10px', // Added rounded corners to input field
    },
  },
  saveButton: {
    borderRadius: '20px', // Added rounded corners
  },
}));

function PlayerProfile({ player, onUpdateProfile }) {
  const classes = useStyles();
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(player.name);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateProfile({ name: editName });
    setIsEditing(false);
  };

  return (
    <Paper className={classes.paper}>
      {!isEditing ? (
        <>
          <div className={classes.info}>
            <Typography variant="h6">{player.name}</Typography>
            <Typography variant="body1">Points: {player.points}</Typography>
          </div>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setIsEditing(true)}
            className={classes.editButton}
          >
            Edit Name
          </Button>
        </>
      ) : (
        <form onSubmit={handleSubmit} className={classes.form}>
          <TextField
            label="Name"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            fullWidth
            className={classes.nameInput}
          />
          <Button 
            type="submit" 
            variant="contained" 
            color="primary"
            className={classes.saveButton}
          >
            Save Changes
          </Button>
        </form>
      )}
    </Paper>
  );
}

export default PlayerProfile;
