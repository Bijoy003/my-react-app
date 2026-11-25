import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import AuthProvider from "./auth/AuthProvider";
import RequireAuth from "./auth/RequireAuth";
import Layout from "./layout/Layout";
import HomePage from "./pages/HomePage";
import HooksPage from "./pages/HooksPage";
import LessonPage from "./pages/LessonPage";
import MemberPage from "./pages/MemberPage";
import NotFoundPage from "./pages/NotFoundPage";
import SignInPage from "./pages/SignInPage";

// The practice app brings in TanStack Query, React Hook Form and Zod. Loading
// it on demand keeps those libraries out of the first visit's bundle.
const PracticeRoot = lazy(() => import("./practice/PracticeRoot"));
const RecipeListPage = lazy(() => import("./practice/RecipeListPage"));
const RecipeDetailPage = lazy(() => import("./practice/RecipeDetailPage"));
const RecipeFormPage = lazy(() => import("./practice/RecipeFormPage"));

function PracticeFallback() {
  return (
    <p role="status" className="py-10 text-sm text-ink-muted">
      Loading the practice app…
    </p>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="hooks" element={<HooksPage />} />
          <Route path="labs/:track/:slug" element={<LessonPage />} />
          <Route path="sign-in" element={<SignInPage />} />
          <Route
            path="practice"
            element={
              <Suspense fallback={<PracticeFallback />}>
                <PracticeRoot />
              </Suspense>
            }
          >
            <Route index element={<RecipeListPage />} />
            <Route path="new" element={<RecipeFormPage />} />
            <Route path=":id" element={<RecipeDetailPage />} />
            <Route path=":id/edit" element={<RecipeFormPage />} />
          </Route>
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
