import { Pagination } from "@mui/material";

const PaginationBtns = ({total, setCurrentPageCount}) => {
    const onBtnClick = (e) =>{
        console.log(e.target.textContent)
        setCurrentPageCount(e.target.innerText)
    }
    return (
        <Pagination count={total} color="primary" onChange={onBtnClick}/>
    )
};

export default PaginationBtns
