import './Comment.css'
import { FormEvent, useEffect, useRef, useState } from 'react';
import Reply from './Reply';
import useDatabase from '../hooks/useDatabase';

export default function Comment({ comment }: { comment: typeComment; }) {
  const contentRef = useRef<HTMLDivElement>(null)
  const [showReply, setShowReply] = useState(false)
  const [replyText, setReplyText] = useState("")
  const [heightTop, setHeightTop] = useState(0)
  const [heightBottom, setHeightBottom] = useState(0)
  const [comm, setComm] = useState(comment)
  const { database, dispatch } = useDatabase()

  useEffect(() => {
    if (contentRef.current) {
      setHeightTop(-1 * contentRef.current.getBoundingClientRect().height - 32 + 6)
    }
  }, [])

  function handleReplyComment() {
    setShowReply(!showReply)
  }

  function handleReplyReply(reply: typeReply) {
    addReply(reply)
  }

  function handleChangeReply(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setReplyText(e.target.value)
  }

  function handleSubmitReply(e: FormEvent) {
    e.preventDefault()
    handleReplyComment()
    addReply()
  }

  function addReply(reply?: typeReply) {
    let _comment = {...comm}
    if (!comm.replies) _comment = {..._comment, replies: []}
    _comment.replies!.push({
      content: reply ? reply.content : replyText,
      replyingTo: reply ? reply.replyingTo : comm.user.username,
      user: {
        image:    database.currentUser.image,
        name:     database.currentUser.name,
        username: database.currentUser.username
      }
    })
    setComm(_comment)
    setReplyText("")
    console.log("Reply!")
  }
 
  return (
    <div className="comment">
      <div className="comment__body">
        <div className="comment__photo">
          <img src={`/src/${comment.user.image.slice(1)}`} alt="user photo" />
        </div>
        <div className="comment__content">
          <div className="comment__content--top">
            <div className="comment__content--top-left">
              <div className="comment__content--name">
                {comment.user.name}
              </div>
              <div className="comment__content--username">
                {`@${comment.user.username}`}
              </div>
            </div>
            <div className="comment__content--reply"
              onClick={handleReplyComment}
            >Reply</div>
          </div>
          <div className="comment__content--content" ref={contentRef}>
            {comment.content}
          </div>
          <form className={`comment__content--content-post ${showReply ? "show" : ""}`}
            onSubmit={handleSubmitReply}
          >
            <textarea className="content-input"
              name        = 'add-reply-comm' id = 'add-reply-comm'
              onChange    = {handleChangeReply}
              placeholder = 'Type your reply here'
              maxLength   = {250}
              value       = {replyText}
            />
            <button className="content-post-reply">Post Reply</button>
          </form>
        </div>
      </div>
      <div className="comment__replies">
        {comm.replies && comm.replies.map((reply, index) => 
          <Reply reply={reply} key={index} 
            setHeightContent = {setHeightBottom}
            handleReplyReply = {handleReplyReply}
          />
        )}
        {comm.replies && comm.replies.length > 0 &&
          <div className="replies-line" 
            style={{top: heightTop, bottom: heightBottom}}>
          </div>}
      </div>
    </div>
  );
}