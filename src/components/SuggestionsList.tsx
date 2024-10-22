import './SuggestionsList.css'
import React, { useEffect, useState } from 'react'
import useDatabase from '../hooks/useDatabase'
import NoFeedback     from './NoFeedback'
import SuggestionItem from './SuggestionItem'

export default function SuggestionsList({listItems} : {listItems: typeListItems[]}) {
  const [showSort, setShowSort] = useState(false)
  const [selected, setSelected] = useState(0)
  const { dispatch } = useDatabase()
  
  const [sortOptions, setSortOptions] = useState([
    { text: "Most upvotes",   selected: true  },
    { text: "Least upvotes",  selected: false },
    { text: "Most comments",  selected: false },
    { text: "Least comments", selected: false },
  ])

  const numSuggestions = listItems?.length

  useEffect(() => {
    let _options = sortOptions.map((option, index) => {
      return { text: option.text, selected: index === selected }
    })
    setSortOptions(_options)
  }, [selected])

  function handleSortList(index: number) {
    setSelected(index)
    
    if (!listItems) return
    
    switch(index) {
      case 0: // Most upvotes:
        listItems.sort((a, b) => b.upvotes - a.upvotes)
        break

      case 1: // Least upvotes:
        listItems.sort((a, b) => a.upvotes - b.upvotes)
        break

      case 2: // Most comments:
        listItems.sort((a, b) => (b.comments?.length || 0) - (a.comments?.length || 0))
        break

      case 3: // Least comments:
        listItems.sort((a, b) => (a.comments?.length || 0) - (b.comments?.length || 0))
        break

      default:
        console.log("Error on sorting option!")
    }
  }

  function handleUpvotes(e: React.MouseEvent<HTMLDivElement>, id: number) {
    e.stopPropagation()
    dispatch({ type: "upvote", id: id})
  }

  return (
    <div className="suggestions-list"> 
      <div className="suggestions-list__header">
        <div className="suggestion-list__header--left">
          <div className="suggestion-list__header--logo"></div>
          <div className="suggestion-list__header--quantity">
            {numSuggestions} Suggestions
          </div>
          <div className="suggestions-list__header--sort">
            <div className={`suggestions-list__header--sort-text ${numSuggestions ? "" : "cero"}`}
              onClick={() => setShowSort(!showSort)}
            >
              <div className="name">Sort by :</div>
              <div className={`selected ${showSort ? "open" : ""}`}>{sortOptions[selected].text}</div>
              <div className={`icon ${showSort || !numSuggestions ? "open" : ""}`}></div>
              <div className={`suggestions-list__header--sort-list ${showSort ? "show" : ""}`}>
                <SortList options={sortOptions} handleSortList={handleSortList} />
              </div>
            </div>
          </div>
        </div>
        <div className="suggestions-list__header--right">
          <button className="suggestions-list__header--add-feedback" 
            type='button'
          >
            + Add Feedback
          </button>
        </div>
      </div>

      <div className="suggestions-list__items">
        { numSuggestions 
          ? listItems?.map(item => 
              <SuggestionItem key={item.id} item={item} handleUpvotes={handleUpvotes} />)
          : <NoFeedback />
        }
      </div>
    </div>
  )
}

type typeOption = {
  text: string,
  selected: boolean
}

function SortList({options, handleSortList}: {options: typeOption[], handleSortList: any}) {
  return (
    <>
      { options.map((item: typeOption, index: number) =>
        <SortMenuItem item={item} index={index} 
          handleClick={() => handleSortList(index)} key={index}/>
      )}
    </>
  )
}

type typeSortMenuItems = {
  text: string,
  selected: boolean
}

function SortMenuItem( {item, index, handleClick} : {item: typeSortMenuItems, index:number, handleClick: any} ) {
  return (
    <div className="menu-item" onClick={() => handleClick(index)}>
      <div className="text" >{item.text}</div>
      <div className={`check ${item.selected ? "selected": ""}`}></div>
    </div>
  )
}

