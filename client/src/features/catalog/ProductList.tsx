import { List } from '@mui/material'
import { Product } from '../../app/models/Product';
import ProductCard from './ProductCard';


interface Props {
    products: Product[];
}

function ProductList({ products }: Props) {
    return (
        <div>
            <List>
                {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </List>
        </div>
    )
}

export default ProductList