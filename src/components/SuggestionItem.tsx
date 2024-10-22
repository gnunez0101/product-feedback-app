import './SuggestionItem.css'
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SuggestionItem({ item, handleUpvotes }
  : { item: typeListItems, handleUpvotes(e: React.MouseEvent<HTMLDivElement>, id: number): any; }) {
  const [upvotes, setUpvotes] = useState(item.upvotes);
  const numComments = item.comments?.length || 0;
  const navigate = useNavigate();

  return (
    <>
      { item.show &&
        <div className="suggestion"
          onClick={() => navigate(`/feedback-detail/${item.id}`)}
        >
          <div className="left">
            <div className="votes"
              onClick={(e) => {
                handleUpvotes(e, item.id);
                setUpvotes(upvotes + 1);
              }}
            >
              <div className="icon">^</div>
              <div className="num-votes">{upvotes}</div>
            </div>
            <div className="contents">
              <div className="title">{item.title}</div>
              <div className="description">{item.description}</div>
              <div className="category">{item.category}</div>
            </div>
          </div>
          <div className="right">
            <div className="icon"></div>
            <div className={`comments ${numComments == 0 ? "cero" : ""}`}>{numComments}</div>
          </div>
        </div>
      }
    </>
  );
}
