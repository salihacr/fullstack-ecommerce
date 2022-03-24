import { debounce, TextField } from "@mui/material";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { setProductParams } from "./catalogSlice";

export default function ProductSearch() {

    const { productParams } = useAppSelector(state => state.catalog);
    const [searchText, setSearchText] = useState(productParams.searchText);
    const dispatch = useAppDispatch();


    const debouncedSearch = debounce((event: any) => {
        dispatch(setProductParams({ searchText: event.target.value }))
    }, 1000)

    return (
        <TextField
            label='Search products'
            variant='outlined'
            fullWidth
            value={searchText || ''}
            onChange={(event: any) => {
                setSearchText(event.target.value);
                debouncedSearch(event);
            }}
        />
    )
}