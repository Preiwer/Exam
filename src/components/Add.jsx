import {
  Button,
  DialogTitle,
  Dialog,
  DialogContent,
  DialogContentText,
  Input,
  FormControl,
  FormLabel,
  TextField,
  DialogActions,
  Box,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";

const Add = ({ fetchCurrentData, currentData }) => {
  const [open, setOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState("");

  const handleSubmit = () => {
    let newNote = {
      title: title,
      content: content,
      category: tag,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    axios
      .post("https://test.uzprogers.uz/api/notes/?format=json", newNote)
      .then((response) => {
        console.log(response.data);
        setOpen(false);
      })
      .catch((error) => {
        console.error(error);
      });

    fetchCurrentData();
  };
  return (
    <>
      <Button onClick={() => setOpen(true)} fullWidth variant="contained">
        Add
      </Button>
      <Dialog
        open={open}
        keepMounted
        onClose={() => setOpen(false)}
        aria-describedby="dialDesc"
      >
        <DialogTitle>Add new item</DialogTitle>
        <DialogContent>
          <DialogContentText id="dialDesc">
            Fill this form and submit it
          </DialogContentText>
          <Box marginTop={1}>
            <form onSubmit={handleSubmit}>
              <FormControl
                required
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContext: "space-between",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <TextField
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  label="Title *"
                />
                <TextField
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  multiline
                  fullWidth
                  rows={3}
                  label="Content *"
                />
                <TextField
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  label="Tag *"
                />
              </FormControl>
            </form>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Close</Button>
          <Button type="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Add;
