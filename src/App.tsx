import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import PreviewShell from './components/layout/PreviewShell'
import ScrollToTop from './components/layout/ScrollToTop'
import HomePage from './pages/HomePage'
import CoursesPage from './pages/CoursesPage'
import CourseDetailPage from './pages/CourseDetailPage'
import PlacementsPage from './pages/PlacementsPage'
import FranchisePage from './pages/FranchisePage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import ApplyPage from './pages/ApplyPage'
import BlogsPage from './pages/BlogsPage'
import InfrastructurePage from './pages/InfrastructurePage'
import ArticlePage from './pages/ArticlePage'
import { blogPosts } from './data/blogs'

export default function App() {
  return (
    <BrowserRouter>
      <PreviewShell>
        <ScrollToTop />
        <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/courses/:courseId" element={<CourseDetailPage />} />
        <Route path="/course-detail" element={<Navigate to="/courses/cchm" replace />} />
        <Route path="/placements" element={<PlacementsPage />} />
        <Route path="/franchise" element={<FranchisePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/apply" element={<ApplyPage />} />
        <Route path="/infrastructure" element={<InfrastructurePage />} />
        <Route path="/blogs" element={<BlogsPage />} />
        <Route path="/article/:id" element={<Navigate to="/blogs" replace />} />
        {blogPosts.map((post) => (
          <Route key={post.slug} path={post.slug} element={<ArticlePage slug={post.slug} />} />
        ))}
        </Routes>
      </PreviewShell>
    </BrowserRouter>
  )
}
