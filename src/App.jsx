import { Route, Routes } from "react-router-dom";
import AuthProvider from "./auth/AuthProvider";
import RequireAuth from "./auth/RequireAuth";
import Layout from "./layout/Layout";
import HomePage from "./pages/HomePage";
import LessonPage from "./pages/LessonPage";
import MemberPage from "./pages/MemberPage";
import NotFoundPage from "./pages/NotFoundPage";
import SignInPage from "./pages/SignInPage";

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="labs/:track/:slug" element={<LessonPage />} />
          <Route path="sign-in" element={<SignInPage />} />
          <Route
            path="member"
            element={
              <RequireAuth>
                <MemberPage />
              </RequireAuth>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}
