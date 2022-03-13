import { Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { useState } from "react";
import { Route } from "react-router-dom";
import AboutPage from "../../features/about/AboutPage";
import CatalogPage from "../../features/catalog/CatalogPage";
import ProductDetailPage from "../../features/catalog/ProductDetailPage";
import ContactPage from "../../features/contact/ContactPage";
import HomePage from "../../features/home/HomePage";
import Header from "./Header";

function App() {
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

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
        <Container>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/catalog' component={CatalogPage} />
          <Route path='/catalog/:id' component={ProductDetailPage} />
          <Route path='/about' component={AboutPage} />
          <Route path='/contact' component={ContactPage} />
        </Container>
      </ThemeProvider>
    </>
  );
}

export default App;