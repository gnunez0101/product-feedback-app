import { useEffect, useState } from 'react'
import './Sidebar.css'
import useDatabase from '../hooks/useDatabase'

export default function() {
  const { database } = useDatabase()
  
  const filterItems = [
    "All",
    "UI",
    "UX",
    "Enhancement",
    "Bug",
    "Feature"
  ]

  const [roadmapItems, setRoadmapItems] = useState([
    { color: "#F49F85", value: "planned",     label: "Planned",     views: 0 },
    { color: "#AD1FEA", value: "in-progress", label: "In-Progress", views: 0 },
    { color: "#62BCFA", value: "live",        label: "Live",        views: 0 },
  ])

  useEffect(() => {
    // Counting Elements for Roadmap Summary:
    let roadmapItemsCopy =  [...roadmapItems]
    roadmapItems.forEach( (rmItem, index) => 
      roadmapItemsCopy[index].views = database.productRequests.filter((dbItem) => 
        dbItem.status === rmItem.value).length
    )
    setRoadmapItems(roadmapItemsCopy)
  }, [])

  return (
    <div className="sidebar">

      <div className="sidebar__header">
        <div className="sidebar__header-text">
          <div className="sidebar__header-text--title">
            Frontend Mentor
          </div>
          <div className="sidebar__header-text--subtitle">
            Feedback Board
          </div>
        </div>
      </div>

      <div className="sidebar__filters">
        {filterItems.map((item, index) => 
          <div className="sidebar__filters_item" key={index}>{item}</div>
        )}
      </div>

      <div className="sidebar__roadmap">
        <div className="sidebar__roadmap-header">
          <div className="sidebar__roadmap-header--title">Roadmap</div>
          <a className="sidebar__roadmap-header--view" href='#'>View</a>
        </div>
        <div className="sidebar__roadmap-items">
          { roadmapItems.map((item: typeRoadmapItem, index: number) => 
            <RoadmapItem item={item} key={index} />)
          }
        </div>
      </div>
      
    </div>
  )
}

type typeRoadmapItem = {
  color: string,
  value: string,
  label: string,
  views: number
}

function RoadmapItem( {item}: {item: typeRoadmapItem} ) {
  return (
    <div className='sidebar__roadmap-item'>
      <div className="name-group">
        <span className="bullet" style={{ backgroundColor: item.color }}></span>
        <span className="name">{item.label}</span>
      </div>
      <div className="views">{item.views}</div>
    </div>
  )
}