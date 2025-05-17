import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "@/contexts/AuthContext";
import DashboardLayout from "@/components/layout/DashboardLayout";

export default function App({ Component, pageProps }: AppProps) {
  // 登录页面不需要使用 DashboardLayout
  if (Component.name === 'Login') {
    return (
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    );
  }

  return (
    <AuthProvider>
      <DashboardLayout>
        <Component {...pageProps} />
      </DashboardLayout>
    </AuthProvider>
  );
}
