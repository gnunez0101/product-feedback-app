import { useEffect, useRef, useState } from 'react';
import './Comment.css'
import Reply from './Reply';

export default function Comment({ comment }: { comment: typeComment; }) {
  const contentRef = useRef<HTMLDivElement>(null)
  const [heightTop, setHeightTop] = useState(0)
  const [heightBottom, setHeightBottom] = useState(0)

  useEffect(() => {
    if (contentRef.current) {
      setHeightTop(-1 * contentRef.current.getBoundingClientRect().height - 32 + 6)
    }
  }, [])
 
  console.log(heightTop, heightBottom)

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
            <div className="comment__content--reply">Reply</div>
          </div>
          <div className="comment__content--content" ref={contentRef}>
            {comment.content}
          </div>
        </div>
      </div>
      <div className="comment__replies">
        {comment.replies && comment.replies.map((reply, index) => 
          <Reply reply={reply} key={index} setHeightContent={setHeightBottom} />
        )}
        {comment.replies && 
          <div className="replies-line" 
            style={{top: heightTop, bottom: heightBottom}}>
          </div>}
      </div>
    </div>
  );
}