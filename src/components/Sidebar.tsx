import { useEffect, useState } from 'react'
import './Sidebar.css'

export default function({listItems, setFilter}: {listItems: typeProductRequest[], setFilter: any}) {

  const [filterItems, setFilterItems] = useState([
    { label: "All",         selected: true  },
    { label: "UI",          selected: false },
    { label: "UX",          selected: false },
    { label: "Enhancement", selected: false },
    { label: "Bug",         selected: false },
    { label: "Feature",     selected: false },
  ])

  const [roadmapItems, setRoadmapItems] = useState([
    { color: "#F49F85", status: "planned",     label: "Planned",     views: 0 },
    { color: "#AD1FEA", status: "in-progress", label: "In-Progress", views: 0 },
    { color: "#62BCFA", status: "live",        label: "Live",        views: 0 },
  ])

  useEffect(() => {
    // Counting Elements for Roadmap Summary:
    let roadmapItemsCopy =  [...roadmapItems]
    roadmapItems.forEach( (rmItem, index) => 
      roadmapItemsCopy[index].views = listItems.filter((dbItem) => 
        dbItem.status === rmItem.status).length
    )
    setRoadmapItems(roadmapItemsCopy)
  }, [])

  function handleFilters(index: number) {
    let items = [...filterItems]    // Make copy of filters
    items.forEach(item => item.selected = false)  // Deselect all
    items[index].selected = true    // Select and highlight clicked filter
    setFilter(filterItems[index].label.toLowerCase())  // Return filter text
    setFilterItems(items)   // Update filter items
  }

  return (
    <div className="sidebar">
      {/* --------------------------------------------------------- */}
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
      {/* --------------------------------------------------------- */}
      <div className="sidebar__filters">
        {filterItems.map((item, index) => 
          <div key={index} 
            className={`sidebar__filters_item ${item.selected ? "selected" : ""}`}
            onClick={() => handleFilters(index)}
          >{item.label}</div>
        )}
      </div>
      {/* --------------------------------------------------------- */}
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
      {/* --------------------------------------------------------- */}
    </div>
  )
}

type typeRoadmapItem = {
  color: string,
  status: string,
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