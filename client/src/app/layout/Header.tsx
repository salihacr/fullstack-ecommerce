import { ShoppingCart } from "@mui/icons-material";
import { AppBar, Switch, Toolbar, Typography, List, ListItem, Badge, IconButton } from "@mui/material";
import { Box } from "@mui/system";
import { NavLink, Link } from "react-router-dom";
import { useAppSelector } from "../store/configureStore";
import SignedInMenu from "./SignedInMenu";

interface Props {
	darkMode: boolean;
	handleThemeChange: () => void;
}

const midLinks = [
	{ title: 'catalog', path: '/catalog' },
	{ title: 'about', path: '/about' },
	{ title: 'contact', path: '/contact' },
]
const rightLinks = [
	{ title: 'login', path: '/login' },
	{ title: 'register', path: '/register' },
]

const navStyles = {
	color: 'inherit',
	textDecoration: 'none',
	typography: 'h6',
	'&:hover': {
		color: 'grey.500'
	},
	'&.active': {
		color: 'text.secondary'
	}
};

export default function Header({ darkMode, handleThemeChange }: Props) {

	const { basket } = useAppSelector(state => state.basket);
	const { user } = useAppSelector(state => state.account);
	const itemCount = basket?.items.reduce((sum, item) => sum + item.quantity, 0)

	return (
		<AppBar position='static'>
			<Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

				<Box display='flex' alignItems='center'>
					<Typography variant='h6' component={NavLink} to='/' exact sx={navStyles}>
						MY STORE
					</Typography>
					<Switch checked={darkMode} onChange={handleThemeChange} />
				</Box>

				<List sx={{ display: 'flex' }}>
					{midLinks.map(({ title, path }) =>
						<ListItem
							component={NavLink}
							to={path}
							key={path}
							sx={navStyles}
						>
							{title.toUpperCase()}
						</ListItem>
					)}
				</List>

				<Box display='flex' alignItems='center'>
					<IconButton component={Link} to='/basket' size='large' sx={{ color: 'inherit' }}>
						<Badge badgeContent={itemCount} color='secondary'>
							<ShoppingCart />
						</Badge>
					</IconButton>
					{user
						? (<SignedInMenu />)
						: (
							<List sx={{ display: 'flex' }}>
								{rightLinks.map(({ title, path }) =>
									<ListItem
										component={NavLink}
										to={path}
										key={path}
										sx={navStyles}
									>
										{title.toUpperCase()}
									</ListItem>
								)}
							</List>
						)}

				</Box>
			</Toolbar>
		</AppBar>
	)
}