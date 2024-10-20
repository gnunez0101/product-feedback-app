import './FeedbackDetail.css'
import { useParams }  from "react-router-dom"
import SuggestionItem from "./SuggestionItem"
import useDatabase    from "../hooks/useDatabase"
import Comment from './Comment'

export default function FeedbackDetail() {
  const { database, dispatch } = useDatabase()

  const params = useParams()
  const item: typeProductRequest = database.productRequests.find((element) => element.id.toString() == params.id)!
  const listItem:typeListItems = {...item, show: true}

  const commentsCount = item.comments?.length || 0

  let repliesCount = 0
  item.comments?.forEach(element => repliesCount += element.replies?.length || 0)

  function handleUpvotes() {
    dispatch({ type: "upvote", id: parseInt(params.id!)})
  }

  return (
    <>
      <div className="feedback-detail">
        <div className="feedback-detail__header">
          <div className="feedback-detail__header-nav">
            <div className="back">
              <div className="icon-back">{'<'}</div>
              <div className="text-back">Go Back</div>
            </div>
            <button className="edit" 
            type='button'
          >
            Edit Feedback
          </button>
          </div>
          <div className="feedback-detail__item">
            <SuggestionItem item={listItem} handleUpvotes={handleUpvotes} />
          </div>
        </div>

        <div className="feedback-detail__comments">
          <div className="feedback-detail__comments--title">
            {`${commentsCount + repliesCount} Comments`}
          </div>
          <div className="feedback-detail__comments--items">
            { listItem.comments?.map(item => 
              <Comment comment={item} key={item.id} />
            )}
          </div>
        </div>

        <div className="feedback-detail__add-comment">
          <div className="feedback-detail__add-comment--title">Add Comment</div>
          <textarea className='feedback-detail__add-comment--textarea'
            name="add-comment" id="add-comment" 
              style={{minHeight: "80px"}}
              placeholder='Type your comment here'>
          </textarea>
          <div className="feedback-detail__add-comment--footer">
            <div className="chars-left">250 Characters left</div>
            <button className="post-comment" type='button'>
              Post Comment
            </button>
          </div>
        </div>
      </div>
    </>
  )
}