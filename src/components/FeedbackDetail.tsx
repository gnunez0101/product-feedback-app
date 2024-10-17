import { useParams } from "react-router-dom"

export default function FeedbackDetail() {
  const params = useParams()
  return (
    <div>FeedbackDetail para {params.id}</div>
  )
}