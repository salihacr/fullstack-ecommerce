import { Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, Pagination, Paper, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect } from "react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchFilters, fetchProductsAsync, productSelectors } from "./catalogSlice";
import ProductList from "./ProductList";

const sortOptions = [
    { value: 'name', label: 'Alphabetical' },
    { value: 'priceDesc', label: 'Price - High to low' },
    { value: 'price', label: 'Price - Low to high' },
];

function CatalogPage() {
    const products = useAppSelector(productSelectors.selectAll);
    const { productsLoaded, status, filtersLoaded, brands, types } = useAppSelector(state => state.catalog)
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!productsLoaded) dispatch(fetchProductsAsync());

    }, [productsLoaded, dispatch])

    useEffect(() => {
        if (!filtersLoaded) dispatch(fetchFilters())
    }, [dispatch, filtersLoaded])

    if (status.includes('pending')) return <LoadingComponent message="Loading products..." />

    return (
        <>
            <Grid container spacing={4}>
                <Grid item xs={3}>
                    <Paper sx={{ mb: 2 }}>
                        <TextField
                            label='Search products'
                            variant='outlined'
                            fullWidth
                        />
                    </Paper>
                    <Paper sx={{ mb: 2, p: 2 }}>
                        <FormControl>
                            <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                            <RadioGroup>
                                {sortOptions.map(({ label, value }) => (
                                    <FormControlLabel key={value} value={value} control={<Radio />} label={label} />
                                ))}
                            </RadioGroup>
                        </FormControl>
                    </Paper>

                    <Paper sx={{ mb: 2, p: 2 }}>
                        <FormGroup>
                            {brands.map(brand => (
                                <FormControlLabel key={brand} control={<Checkbox defaultChecked />} label={brand} />
                            ))}
                        </FormGroup>
                    </Paper>

                    <Paper sx={{ mb: 2, p: 2 }}>
                        <FormGroup>
                            {types.map(type => (
                                <FormControlLabel key={type} control={<Checkbox defaultChecked />} label={type} />
                            ))}
                        </FormGroup>
                    </Paper>
                </Grid>
                <Grid item xs={9}>
                    <ProductList products={products} />
                </Grid>
                <Grid item xs={3} />
                <Grid item xs={9}>
                    <Box display='flex' justifyContent='space-between' alignItems='center'>
                        <Typography>
                            Displaying 1-6 of 20 items
                        </Typography>
                        <Pagination
                            color='secondary'
                            size='large'
                            count={10}
                            page={2}
                        />
                    </Box>
                </Grid>
            </Grid>

        </>
    )
}

export default CatalogPage;