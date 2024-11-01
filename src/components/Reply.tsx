import './Reply.css'
import { FormEvent, useEffect, useRef, useState } from 'react';
import useDatabase from '../hooks/useDatabase';

export default function Reply({ reply, setHeightContent, handleReplyReply }: { reply: typeReply, setHeightContent: any, handleReplyReply: any }) {
  const [showReply, setShowReply] = useState(false)
  const contentRef = useRef<HTMLSpanElement>(null)
  const [replyText, setReplyText] = useState("")
  const { database } = useDatabase()

  useEffect(() => {
    if (contentRef.current) {
      setHeightContent(contentRef.current.getBoundingClientRect().height + 32 + 17 + 20)
    }
  }, [])

  function handleReply() {
    setShowReply(!showReply)
  }

  function handleChangeReply(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setReplyText(e.target.value)
  }
  
  function handleSubmitReply(e: FormEvent) {
    e.preventDefault()
    const _reply = {
      content: replyText,
      replyingTo: reply.user.username,
      user: {
        image:    database.currentUser.image,
        name:     database.currentUser.name,
        username: database.currentUser.username
      }
    }
    handleReplyReply(_reply)
    setReplyText("")
    handleReply()
  }
  
  return (
    <div className="reply">
      <div className="reply__body">
        <div className="reply__photo">
          <img src={`/src/${reply.user.image.slice(1)}`} alt="user photo" />
        </div>
        <div className="reply__content">
          <div className="reply__content--top">
            <div className="reply__content--top-left">
              <div className="reply__content--name">
                {reply.user.name}
              </div>
              <div className="reply__content--username">
                {`@${reply.user.username}`}
              </div>
            </div>
            <div className="reply__content--reply"
              onClick={handleReply}
            >Reply</div>
          </div>
          <div className="reply__content--content">
            <span className="replyingto">{reply.replyingTo}</span>
            <span className="content" ref={contentRef}>{reply.content}</span>
          </div>
          <form className={`reply__content--content-post ${showReply ? "show" : ""}`}
            onSubmit={handleSubmitReply}
          >
            <textarea className="content-input"
              name='add-reply-reply' id="add-reply-reply"
              placeholder = 'Type your reply here'
              onChange    = {handleChangeReply}
              maxLength   = {250}
              value       = {replyText}
            />
            <button className="content-post-reply">Post Reply</button>
          </form>
        </div>
      </div>
    </div>
  );
}