import { Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { useState, useEffect, useCallback } from "react";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AboutPage from "../../features/about/AboutPage";
import CatalogPage from "../../features/catalog/CatalogPage";
import ProductDetailPage from "../../features/catalog/ProductDetailPage";
import ContactPage from "../../features/contact/ContactPage";
import HomePage from "../../features/home/HomePage";
import Header from "./Header";
import 'react-toastify/dist/ReactToastify.css';
import ServerError from "../errors/ServerError";
import NotFound from "../errors/NotFound";
import BasketPage from "../../features/basket/BasketPage";
import LoadingComponent from "./LoadingComponent";
import CheckoutPage from "../../features/checkout/CheckoutPage";
import { useAppDispatch } from "../store/configureStore";
import { fetchBasketAsync } from "../../features/basket/basketSlice";
import LoginPage from "../../features/account/LoginPage";
import RegisterPage from "../../features/account/RegisterPage";
import { fetchCurrentUser } from "../../features/account/accountSlice";

function App() {

  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  const initApp = useCallback(async () => {
    try {
      await dispatch(fetchCurrentUser());
      await dispatch(fetchBasketAsync());
    } catch (error: any) {
      console.log(error);
    }
  }, [dispatch])


  useEffect(() => {
    initApp().then(() => setLoading(false));
  }, [initApp])

  const [darkMode, setDarkMode] = useState(false);
  const paletteType = darkMode ? 'dark' : 'light';
  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === 'light' ? '#eaeaea' : '#121212'
      }
    }
  })

  function handleThemeChange() {
    setDarkMode(!darkMode);
  }

  if (loading) return <LoadingComponent message="Initializing app" />

  return (
    <>
      <ThemeProvider theme={theme}>
        <ToastContainer position="top-right" hideProgressBar />
        <CssBaseline />
        <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
        <Container>
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route exact path='/catalog' component={CatalogPage} />
            <Route path='/catalog/:id' component={ProductDetailPage} />
            <Route path='/about' component={AboutPage} />
            <Route path='/contact' component={ContactPage} />
            <Route path='/basket' component={BasketPage} />
            <Route path='/checkout' component={CheckoutPage} />
            <Route path='/login' component={LoginPage} />
            <Route path='/register' component={RegisterPage} />
            <Route path='/server-error' component={ServerError} />
            <Route component={NotFound} />
          </Switch>
        </Container>
      </ThemeProvider>
    </>
  );
}

export default App;