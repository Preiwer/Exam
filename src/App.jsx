import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import PaginationBtns from "./components/PaginationBtns";
import TheList from "./components/TheList";
import { Box, Button, CircularProgress, Dialog } from "@mui/material";
import Add from "./components/Add";

function App() {
  const [total, setTotal] = useState(0);
  const [currentData, setCurrentData] = useState([]);
  const [currentDataStop, setCurrentDataStop] = useState(false);
  const [currentPageCount, setCurrentPageCount] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTotal = async () => {
      let totalUrl = await axios.get(
        "https://test.uzprogers.uz/api/notes/?format=json"
      );
      let totalData = await totalUrl.data["total"];
      setTotal(totalData);
    };
    fetchTotal();
    console.log("Total", total);
  }, [total]);

  const fetchCurrentData = async () => {
    let currentDataUrl = await axios.get(
      `https://test.uzprogers.uz/api/notes/?format=json&page=${currentPageCount}&limit=3`
    );
    let currentDataContent = await currentDataUrl.data["notes"];
    setCurrentData(currentDataContent);
    // setLoading(false);
    console.log(currentData);
  };

  const fetchCurrentDataa = async () => {
    let currentDataUrl = await axios.get(
      `https://test.uzprogers.uz/api/notes/?format=json&page=${currentPageCount}&limit=3`
    );
    let currentDataContent = await currentDataUrl.data["notes"];
    setCurrentData(currentDataContent);
    setLoading(false);
    console.log(currentData);
  };
  useEffect(() => {
    fetchCurrentDataa();
  }, [currentPageCount]);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <Box
        sx={{
          position: "fixed",
          top: loading ? 0 : "-100%",
          right: 0,
          bottom: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: "1000",
          backgroundColor: "ButtonShadow",
        }}
      >
        <CircularProgress />
      </Box>
      <Box width={"40%"}>
        <Add fetchCurrentData={fetchCurrentData} currentData={currentData} />
        <TheList
          currentPageCount={currentPageCount}
          currentData={currentData}
          fetchCurrentData={fetchCurrentData}
        />
        <PaginationBtns
          currentPageCount={currentPageCount}
          setCurrentPageCount={setCurrentPageCount}
          total={total}
        />
      </Box>
    </Box>
  );
}

export default App;
