import './Suggestions.css'
import Header from "./Header";
import Sidebar from "./Sidebar";
import SuggestionsList from "./SuggestionsList";

export default function() {
  return (
    <>
      <div className = "suggestions">
        <Header />
        <SuggestionsList />        
      </div>
    </>
  )
}