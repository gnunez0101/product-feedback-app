import './Reply.css'

export default function Reply({ reply }: { reply: typeReply; }) {
  return (
    <>
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
              <div className="reply__content--reply">Reply</div>
            </div>
            <div className="reply__content--content">
              <span className="replyingto">{reply.replyingTo}</span>
              <span className="content">{reply.content}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}