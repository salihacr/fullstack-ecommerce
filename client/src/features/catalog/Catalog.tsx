import { Button } from "@mui/material";
import { Product } from "../../app/models/Product";
import ProductList from "./ProductList";

interface Props {
    products: Product[];
    addProduct: () => void;
}
function Catalog({ products, addProduct }: Props) {
    return (
        <>
            <ProductList products={products} />
            <Button variant='contained' onClick={addProduct}>Add Product</Button>
        </>
    )
}

export default Catalog;