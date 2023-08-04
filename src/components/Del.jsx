import {
  Tooltip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useState, useEffect } from "react";
import axios from "axios";

const Del = ({
  currentTitle,
  currentPageCount,
  fetchCurrentData,
  currentData,
}) => {
  const [open, setOpen] = useState(false);
  const [currentID, setCurrentID] = useState("");

  const evtOpen = () => setOpen(true);
  const evtClose = () => setOpen(false);

  useEffect(() => {
    const fetchCurrentDataForEdit = async () => {
      let currentDataa = await axios.get(
        `https://test.uzprogers.uz/api/notes?format=json&page=${currentPageCount}&limit=3`
      );

      let currentDataNotes = await currentDataa.data["notes"];
      let currentDataFl = await currentDataNotes.filter(
        (elm) => elm.title === currentTitle
      );
      setCurrentID(currentDataFl["0"]["id"]);
      console.log(currentDataFl);
    };

    fetchCurrentDataForEdit();
  }, [currentID]);
  const handleDelete = () => {
    const deleteObj = async () => {
      const dlUrl = await axios
        .delete(`https://test.uzprogers.uz/api/notes/${currentID}?format=json`)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    };
    deleteObj();
    fetchCurrentData();
  };
  return (
    <>
      <Tooltip title="Delete" placement="right">
        <IconButton color="error" onClick={evtOpen}>
          <Delete />
        </IconButton>
      </Tooltip>

      <Dialog
        open={open}
        onClose={evtClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete this item?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure to delete this item?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={evtClose}>Cancel</Button>
          <Button onClick={handleDelete} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Del;
