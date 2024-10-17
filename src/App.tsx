import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Suggestions from './components/Suggestions'
import Roadmap     from './components/Roadmap'
import FeedbackDetail from './components/FeedbackDetail'

// Router singleton created
const router = createBrowserRouter([
  { path: "/",        element: <Suggestions />, errorElement: <div>Error de Página!</div> },
  { path: "/roadmap", element: <Roadmap     /> },
  { path: "/feedback-detail/:id", element: <FeedbackDetail /> },
])

// RouterProvider added
export default function App() {
  return <RouterProvider router={router} />
}