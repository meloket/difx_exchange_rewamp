import { dark, GlobalStyles, light } from "@difx/core-ui/themes";
import { useAuth, useCurrency, useGuestAuth, useLanguage, useTheme } from "@difx/shared";
import 'antd/dist/antd.variable.min.css';
import { ThemeProvider } from "styled-components";
import HomeComponent from '../components/home/HomeComponent';
import BaseLayout from "../layouts/BaseLayout";
import GuestLayout from "../layouts/GuestLayout";
import PrivateLayout from "../layouts/PrivateLayout";

export interface AppLayoutProps {
  children: React.ReactChild;
}

export function AppLayout({ children = <HomeComponent /> }: AppLayoutProps) {
  const { isLoggedIn } = useAuth();
  const { theme } = useTheme();

  useGuestAuth()
  useLanguage()
  useCurrency()

  const LayoutDispatcher = isLoggedIn ? PrivateLayout : GuestLayout

  return (
    // Use theme in ThemeProvider to reuse variable when customize the styled-component
    <ThemeProvider theme={theme === "light" ? light : dark}>
      <GlobalStyles />
      <BaseLayout>
        <LayoutDispatcher>{children}</LayoutDispatcher>
      </BaseLayout>
    </ThemeProvider>
  );
}

export default AppLayout;
