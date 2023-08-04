import { Delete, Edit } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Chip,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import EditObj from "./EditObj";
import Del from "./Del";

const TheList = ({ currentData, currentPageCount, fetchCurrentData }) => {
  return (
    <>
      <Stack divider={<Divider />}>
        {currentData.map((elm) => (
          <List key={elm.id}>
            <ListItem
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <ListItemText
                sx={{ textAlign: "left" }}
                primary={elm.title}
                secondary={
                  <>
                    <Typography>{elm.content}</Typography>
                    <Chip
                      label={elm.category}
                      color="success"
                      variant="outlined"
                    />
                  </>
                }
              />
              <ListItemText
                sx={{ textAlign: "right" }}
                secondary={
                  <>
                    <Typography>{elm.createdAt}</Typography>
                    <Typography>{elm.updatedAt}</Typography>
                  </>
                }
              />
              <Stack marginLeft={2}>
                <EditObj
                  fetchCurrentData={fetchCurrentData}
                  currentTitle={elm.title}
                  currentPageCount={currentPageCount}
                  currentData={currentData}
                />
                <Del
                  fetchCurrentData={fetchCurrentData}
                  currentTitle={elm.title}
                  currentPageCount={currentPageCount}
                  currentData={currentData}
                />
              </Stack>
            </ListItem>
          </List>
        ))}
      </Stack>
    </>
  );
};

export default TheList;
