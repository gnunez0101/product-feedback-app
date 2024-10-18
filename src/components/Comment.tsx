import './Comment.css'
import Reply from './Reply';

export function Comment({ comment }: { comment: typeComment; }) {

  return (
    <>
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
            <div className="comment__content--content">
              {comment.content}
            </div>
          </div>
        </div>
        <div className="comment__replies">
          {comment.replies && comment.replies.map((reply, index) => 
            <Reply reply={reply} key={index} />
          )}
        </div>
      </div>
    </>
  );
}