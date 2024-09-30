import './Suggestions.css'
import Sidebar from "./Sidebar";
import SuggestionsList from "./SuggestionsList";

export default function() {
  return (
    <>
      <div className = "suggestions">
        <Sidebar />
        <SuggestionsList />        
      </div>
    </>
  )
}