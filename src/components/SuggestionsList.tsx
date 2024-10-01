import './SuggestionsList.css'

export default function SuggestionsList() {

  const suggestions = 6
  const selected = "Most Upvotes"
  const sortOptions = [
    { text: "Most upvotes",   selected: true  },
    { text: "Least upvotes",  selected: false },
    { text: "Most comments",  selected: false },
    { text: "Least comments", selected: false },
  ]
  return (
    <div className="suggestions-list">
      <div className="suggestions-list__header">
        <div className="suggestion-list__header--left">
          <div className="suggestion-list__header--logo"></div>
          <div className="suggestion-list__header--quantity">
            {suggestions} Suggestions
          </div>
          <div className="suggestions-list__header--sort">
            <div className='suggestions-list__header--sort-text'>
              <div className="name">Sort by :</div>
              <div className="selected">{selected}</div>
              <div className="icon"></div>
            </div>
            <div className='suggestions-list__header--sort-list'>
              { sortOptions.map((item, index) =>
                <SortMenuItems item={item} key={index}/>
              )}
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

type typeSortMenuItems = {
  text: string,
  selected: boolean
}
function SortMenuItems( {item} : {item: typeSortMenuItems} ) {
  return (
    <div className="menu-item">
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
          <div className="num-votes">110</div>
        </div>
        <div className="contents">
          <div className="title">Suggestion sample for testing purposes</div>
          <div className="description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium repellendus.</div>
          <div className="category">Testing</div>
        </div>
      </div>
      <div className="right">
        <div className="icon">X</div>
        <div className="comments">999</div>
      </div>
    </div>
  )
}