import './FeedbackDetail.css'
import { Link, useParams }  from "react-router-dom"
import SuggestionItem from "./SuggestionItem"
import useDatabase    from "../hooks/useDatabase"
import Comment from './Comment'
import { FormEvent, useEffect, useState } from 'react'

export default function FeedbackDetail() {
  const textMAX = 250
  const [postCommentCharsLeft, setPostCommentCharsLeft] = useState(textMAX)
  const [postCommentText, setPostCommentText] = useState("")
  const [listItem, setListItem] = useState<typeListItems>()
  const [commentsCount, setCommentsCount] = useState(0)
  const [repliesCount, setRepliesCount]   = useState(0)
  const { database, dispatch } = useDatabase()
  
  const params = useParams()
  const item: typeProductRequest = database.productRequests.find((element) => element.id.toString() == params.id)!
  
  useEffect(() => {
    if (item) {
      setListItem({...item, show: true})
    }
  }, [])

  useEffect(() => {
    setCommentsCount(listItem?.comments?.length || 0)
    let _repliesCount = 0
    listItem?.comments?.forEach(element => _repliesCount += element.replies?.length || 0)
    setRepliesCount(_repliesCount)
  }, [listItem?.comments?.length])
  
  function handleUpvotes() {
    dispatch({ type: "upvote", id: parseInt(params.id!)})
  }

  function handleChangePostComment(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setPostCommentCharsLeft(textMAX - e.target.value.length)
    setPostCommentText(e.target.value)
  }

  function handleSubmitPost(e: FormEvent) {
    e.preventDefault()
    let nextID = 0
    let _listItem:typeListItems = {...listItem!}
    if (listItem?.comments)
      nextID = Math.max(...listItem!.comments!.map(comm => comm.id)) + 1
    else
      _listItem = {..._listItem, comments: []}
    
    _listItem.comments!.push({
      id: nextID,
      content: postCommentText,
      user:    database.currentUser,
    })
    setListItem(_listItem)
    setPostCommentText("")
    setPostCommentCharsLeft(textMAX)
    setCommentsCount(commentsCount + 1)
  }

  return (
    <>
      <div className="feedback-detail">

        <div className="feedback-detail__header">
          <div className="feedback-detail__header-nav">
            <Link className="back" to={'/'}>
              <div className="icon-back">{'<'}</div>
              <div className="text-back">Go Back</div>
            </Link>
            <button className="edit" type='button'>
              Edit Feedback
            </button>
          </div>
          <div className="feedback-detail__item">
            { listItem &&
              <SuggestionItem item={listItem} handleUpvotes={handleUpvotes} />
            }
          </div>
        </div>

        <div className="feedback-detail__comments">
          <div className="feedback-detail__comments--title">
            {`${commentsCount + repliesCount} Comments`}
          </div>
          <div className="feedback-detail__comments--items">
            { listItem && listItem.comments?.map(item => 
              <Comment comment={item} key={item.id} />
            )}
          </div>
        </div>

        <form className="feedback-detail__add-comment"
          onSubmit={handleSubmitPost}
        >
          <div className="feedback-detail__add-comment--title">Add Comment</div>
          <textarea className='feedback-detail__add-comment--textarea'
            name="add-comment" id="add-comment" 
            placeholder = 'Type your comment here'
            onChange  = {handleChangePostComment}
            maxLength = {textMAX}
            value = {postCommentText}
          >
          </textarea>
          <div className="feedback-detail__add-comment--footer">
            <div className="chars-left">{postCommentCharsLeft} Characters left</div>
            <button className="post-comment">Post Comment</button>
          </div>
        </form>

      </div>
    </>
  )
}