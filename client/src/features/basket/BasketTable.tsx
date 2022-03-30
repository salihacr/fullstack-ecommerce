import { Add, Delete, Remove } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Box } from "@mui/system";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addBasketItemAsync, removeBasketItemAsync } from "./basketSlice";
import { BasketItem } from "../../app/models/Basket";

interface Props {
    items: BasketItem[];
    isBasket?: boolean;
}

export default function BasketTable({ items, isBasket = true }: Props) {
    const { status } = useAppSelector(state => state.basket);
    const dispatch = useAppDispatch();

    return (
        <TableContainer component={Paper} sx={{ borderBottomRightRadius: 0 }}>
            <Table sx={{ minWidth: 650 }} style={{}}>
                <TableHead>
                    <TableRow>
                        <TableCell>Product</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="center">Quantity</TableCell>
                        <TableCell align="right">Subtotal</TableCell>
                        {isBasket &&
                            <TableCell align="right"></TableCell>
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {items.map(item => (
                        <TableRow
                            key={item.productId}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">

                                <Box display='flex' alignItems='center'>
                                    <img src={item.pictureUrl} alt={item.name} style={{ height: 50, marginRight: 20 }} />
                                    <span>{item.name}</span>
                                </Box>
                            </TableCell>
                            <TableCell align="right">${(item.price / 100).toFixed(2)}</TableCell>
                            <TableCell align="center">
                                {isBasket &&
                                    <LoadingButton
                                        loading={status === ("pendingRemoveItem" + item.productId + 'rem')}
                                        onClick={() => dispatch(removeBasketItemAsync({
                                            productId: item.productId, quantity: 1, name: 'rem'
                                        }))}
                                        color='error'>
                                        <Remove />
                                    </LoadingButton>
                                }
                                {item.quantity}
                                {isBasket &&
                                    <LoadingButton
                                        loading={status === ("pendingAddItem" + item.productId)}
                                        onClick={() => dispatch(addBasketItemAsync({ productId: item.productId }))}
                                        color='secondary'>
                                        <Add />
                                    </LoadingButton>
                                }
                            </TableCell>
                            <TableCell align="right">${(item.quantity * (item.price / 100)).toFixed(2)}</TableCell>
                            <TableCell align="right">
                                {isBasket &&
                                    <LoadingButton
                                        loading={status === ("pendingRemoveItem" + item.productId + 'del')}
                                        onClick={() => dispatch(removeBasketItemAsync({
                                            productId: item.productId, quantity: item.quantity, name: 'del'
                                        }))}
                                        color='error'>
                                        <Delete />
                                    </LoadingButton>
                                }
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )

}