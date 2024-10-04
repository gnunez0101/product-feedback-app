import './NoFeedback.css'

export default function NoFeedback() {
  return (
    <div className="no-feedback">
      
      <div className="no-feedback__img"></div>

      <div className="no-feedback__text">
        <div className="no-feedback__title">
          There is no feedback yet.
        </div>
        <div className="no-feedback__contents">
          Got a suggestion? Found a bug that needs to be squashed?{"\n"}
          We love hearing about new ideas to improve our app.
        </div>
        <button className="no-feedback__add" type="button">
          + Add Feedback
        </button>
      </div>
      
    </div>
  )
}