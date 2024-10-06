import './Suggestions.css'
import Sidebar from "./Sidebar";
import SuggestionsList from "./SuggestionsList";
import useDatabase from '../hooks/useDatabase';
import { useEffect, useState } from 'react';


type typeShowItem = { show: boolean }
type typeListItems = typeProductRequest & typeShowItem

export default function Suggestions() {
  const [listItems, setListItems] = useState<typeListItems[]>()
  const [filters, setFilters] = useState("")
  const { database } = useDatabase()

  useEffect(() => {
    let onlySuggestions = database.productRequests.filter((request) => 
      request.status === "suggestion")
    let onlySuggestionsNew: typeListItems[] = []
    onlySuggestions.forEach((item, index) => {
       onlySuggestionsNew[index] = {...item, show: true}
    })
    setListItems(onlySuggestionsNew)
  }, [])
  
  useEffect(() => {

  }, [filters])

  return (
    <>
      <div className = "suggestions">
        { listItems &&
          <>
            <Sidebar         listItems={database.productRequests} setFilters={setFilters}/>
            <SuggestionsList listItems={listItems} filters='' />
          </>
        }
      </div>
    </>
  )
}