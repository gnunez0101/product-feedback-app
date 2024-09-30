import './SuggestionsList.css'

export default function SuggestionsList() {
  return (
    <>
      <div className="suggestions-list">
        <div className="suggestions-list__header">
          <div className="suggestion-list__header--left">
            <div className="suggestion-list__header--logo"></div>
            <div className="suggestion-list__header--quantity">
              {6} Suggestions
            </div>
            <div className="suggestions-list__header--sort">
              Sort by :
              <select name="sort-list" id="sort-list">
                <option value="">Most upvotes</option>
                <option value="">Least upvotes</option>
                <option value="">Most comments</option>
                <option value="">Least comments</option>
                <option value="">Add Feedback</option>
              </select>
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
      </div>
    </>
  )
}