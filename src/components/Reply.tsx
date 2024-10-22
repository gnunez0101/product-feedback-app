import { useEffect, useRef, useState } from 'react';
import './Reply.css'

export default function Reply({ reply, setHeightContent }: { reply: typeReply, setHeightContent: any }) {
  const [showReply, setShowReply] = useState(false)
  const contentRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (contentRef.current) {
      setHeightContent(contentRef.current.getBoundingClientRect().height + 32 + 17 + 20)
    }
  }, [])

  function handleReply() {
    setShowReply(!showReply)
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
          <form className={`reply__content--content-post ${showReply ? "show" : ""}`}>
            <textarea className="content-input"
              placeholder='Type your reply here'
            />
            <button className="content-post-reply">Post Reply</button>
          </form>
        </div>
      </div>
    </div>
  );
}