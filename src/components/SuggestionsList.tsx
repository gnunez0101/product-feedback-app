import { useEffect, useState } from 'react'
import useDatabase from '../hooks/useDatabase'
import './SuggestionsList.css'

export default function SuggestionsList() {
  const [showSort, setShowSort] = useState(false)
  const [selected, setSelected] = useState(0)

  const { database } = useDatabase()
  
  const [sortOptions, setSortOptions] = useState([
    { text: "Most upvotes",   selected: true  },
    { text: "Least upvotes",  selected: false },
    { text: "Most comments",  selected: false },
    { text: "Least comments", selected: false },
  ])
  const suggestions = 6

  useEffect(() => {
    let _options = sortOptions.map((option, index) => {
      return { text: option.text, selected: index === selected }
    })
    setSortOptions(_options)
  }, [selected])

  function handleSort() {
    setShowSort(!showSort)
  }

  return (
    <div className="suggestions-list">
      <div className="suggestions-list__header">
        <div className="suggestion-list__header--left">
          <div className="suggestion-list__header--logo"></div>
          <div className="suggestion-list__header--quantity">
            {suggestions} Suggestions
          </div>
          <div className="suggestions-list__header--sort">
            <div className='suggestions-list__header--sort-text'
              onClick={handleSort}
            >
              <div className="name">Sort by :</div>
              <div className={`selected ${showSort ? "open" : ""}`}>{sortOptions[selected].text}</div>
              <div className={`icon ${showSort ? "open" : ""}`}></div>
              <div className='suggestions-list__header--sort-list'>
                { showSort && <SortList options={sortOptions} setSelected={setSelected} /> }
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
        <Suggestion />
        <Suggestion />
        <Suggestion />
        <Suggestion />
        <Suggestion />
        <Suggestion />
      </div>
    </div>
  )
}

type typeOption = {
  text: string,
  selected: boolean
}

function SortList({options, setSelected}: {options: typeOption[], setSelected: any}) {
  return (
    <>
      { options.map((item: typeOption, index: number) =>
        <SortMenuItem item={item} index={index} 
          handleClick={() => setSelected(index)} key={index}/>
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
    <div className="menu-item"
      onClick={() => handleClick(index)}
    >
      <div className="text" >{item.text}</div>
      <div className={`check ${item.selected ? "selected": ""}`}></div>
    </div>
  )
}

function Suggestion() {
  return (
    <div className="suggestion">
      <div className="left">
        <div className="votes">
          <div className="icon">^</div>
          <div className="num-votes">65</div>
        </div>
        <div className="contents">
          <div className="title">Suggestion sample for testing purposes</div>
          <div className="description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium repellendus.</div>
          <div className="category">Testing</div>
        </div>
      </div>
      <div className="right">
        <div className="icon"></div>
        <div className="comments">4</div>
      </div>
    </div>
  )
}