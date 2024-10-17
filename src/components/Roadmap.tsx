
import './roadmap.css'
import { useEffect, useState } from 'react'
import useDatabase from '../hooks/useDatabase'
import { Link } from 'react-router-dom'

export default function Roadmap() {
  const { database, dispatch } = useDatabase()

  const [items, setItems] = useState(database.productRequests)

  const [columns, setColumns] = useState([
    { title: "Planned",     count: 0, text: "Ideas prioritized for research", color: "#F49F85" },
    { title: "In-Progress", count: 0, text: "Currently being developed",      color: "#AD1FEA" },
    { title: "Live",        count: 0, text: "Released features",              color: "#62BCFA" }
  ])

  useEffect(() => {
    // Counting Elements for Roadmap Summary:
    let columnsCopy =  [...columns]
    columns.forEach( (column, index) => 
      columnsCopy[index].count = items.filter((dbItem) => 
        dbItem.status === column.title.toLowerCase()).length
    )
    setColumns(columnsCopy)
  }, [])

  function handleUpvotes(id: number) {
    dispatch({ type: "upvote", id: id})
  }

  return (
    <div className='roadmap'>

      <div className="roadmap__header">
        <div className="roadmap__header-left">
          <div className="back">
            <span className="icon-back"></span>
            <Link to={'/'} className="text-back">Go back</Link>
          </div>
          <div className="title">Roadmap</div>
        </div>
        <div className="roadmap__header-right">
          <button className="roadmap__header-right--add-feedback" 
            type='button'
          >
            + Add Feedback
          </button>
        </div>
      </div>

      <div className="roadmap__main">

          { columns.map( (column, index) =>
            <div className="roadmap__main-column" key={index}>
              <div className="title">{`${column.title} (${column.count})`}</div>
              <div className="text">{column.text}</div>
              <div className="items">
                { items.map((item, index) => item.status === column.title.toLowerCase() &&
                  <RoadmapItem item={item} column={column} key={index} handleUpvotes={handleUpvotes}/>
                )}
              </div>
            </div>
          )}
          
      </div>

    </div>
  )
}

function RoadmapItem({item, column, handleUpvotes}: {item: typeProductRequest, column: any, handleUpvotes: any}) {
  const [upvotes, setUpvotes] = useState(item.upvotes)

  return (
    <div className='roadmap__item' style={{ borderTop: `${column.color} 6px solid` }} >
      <div className="column">
        <span className="bullet" style={{ backgroundColor: column.color}}></span>
        <span className="name">{column.title}</span>
      </div>

      <div className="title">{item.title}</div>
      <div className="description">{item.description}</div>
      <div className="category">{item.category}</div>
      <div className="bottom">
        <div className="upvotes"
          onClick={() => {
            handleUpvotes(item.id)
            setUpvotes(upvotes + 1)
          }}
        >
          <span className="icon"></span>
          <span className="votes">{upvotes}</span>
        </div>
        <div className="comments">
          <span className="icon"></span>
          <div className="count">{item.comments?.length}</div>
        </div>
      </div>
    </div>
  )
}