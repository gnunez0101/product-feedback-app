import './Suggestions.css'
import Sidebar from "./Sidebar";
import SuggestionsList from "./SuggestionsList";
import useDatabase from '../hooks/useDatabase';
import { useEffect, useState } from 'react';

export default function Suggestions() {
  const [listSuggestions, setListSuggestions] = useState<typeListItems[]>()
  const [filter, setFilter] = useState("")
  const { database } = useDatabase()

  useEffect(() => {
    let onlySuggestions = database.productRequests.filter((request) => request.status === "suggestion")
    let onlySuggestionsNew: typeListItems[] = []
    onlySuggestions.forEach((item, index) => {onlySuggestionsNew[index] = {...item, show: true}})
    setListSuggestions(onlySuggestionsNew)
  }, [])
  
  useEffect(() => {
    if (listSuggestions) {
      let listCopy = [...listSuggestions!]
      listCopy.forEach(item => item.show = item.category === filter || filter === "all")
      setListSuggestions(listCopy)
    }
  }, [filter])

  return (
    <div className = "suggestions">
      { listSuggestions &&
        <>
          <Sidebar         listItems={database.productRequests} setFilter={setFilter}/>
          <SuggestionsList listItems={listSuggestions} />
        </>
      }
    </div>
  )
}