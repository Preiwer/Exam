import {
  IconButton,
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
  Button,
  Tooltip,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import { useEffect, useState } from "react";
import axios from "axios";

const EditObj = ({
  currentPageCount,
  currentTitle,
  fetchCurrentData,
  currentData,
}) => {
  const [open, setOpen] = useState(false);
  const [currentDataa, setCurrentData] = useState("");
  const [stop, setStop] = useState(false);

  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newTag, setNewTag] = useState("");

  useEffect(() => {
    const fetchCurrentDataForEdit = async () => {
      let currentUrl = await axios.get(
        `https://test.uzprogers.uz/api/notes?format=json&page=${currentPageCount}&limit=3`
      );

      let currentDataNotes = await currentUrl.data["notes"];
      let currentDataFl = await currentDataNotes.filter(
        (elm) => elm.title === currentTitle
      );
      setCurrentData(currentDataFl["0"]["id"]);

      setNewTitle(currentDataFl["0"]["title"]);
      setNewContent(currentDataFl["0"]["content"]);
      setNewTag(currentDataFl["0"]["category"]);
      console.log(currentDataFl);
    };

    fetchCurrentDataForEdit();
  }, [currentDataa]);

  const handleSubmit = () => {
    const newEditedObj = {
      title: newTitle,
      content: newContent,
      category: newTag,
      updatedAt: new Date().toISOString(),
    };

    axios
      .patch(
        `https://test.uzprogers.uz/api/notes/${currentDataa}?format=json`,
        newEditedObj
      )
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
      <Tooltip title="edit" placement="right">
        <IconButton color="primary" onClick={() => setOpen(true)}>
          <Edit />
        </IconButton>
      </Tooltip>

      <Dialog
        open={open}
        keepMounted
        onClose={() => setOpen(false)}
        aria-describedby="dialDesc"
      >
        <DialogTitle>Edit item</DialogTitle>
        <DialogContent>
          <DialogContentText id="dialDesc">
            Fill this form and submit it
          </DialogContentText>
          <Box marginTop={1}>
            <form>
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
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  label="newTitle *"
                />
                <TextField
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  multiline
                  fullWidth
                  rows={3}
                  label="New Content *"
                />
                <TextField
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  label="New Tag *"
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

export default EditObj;
