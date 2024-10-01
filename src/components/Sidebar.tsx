import './Sidebar.css'

export default function() {
  
  const filterItems = [
    "All",
    "UI",
    "UX",
    "Enhancement",
    "Bug",
    "Feature"
  ]

  const roadmapItems = [
    { color: "#F49F85", name: "Planned",     views: 2 },
    { color: "#AD1FEA", name: "In-Progress", views: 3 },
    { color: "#62BCFA", name: "Live",        views: 1 },
  ]

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
          <div className="sidebar__filters_item" key={index}>
            {item}
          </div>
        )}
      </div>

      <div className="sidebar__roadmap">
        <div className="sidebar__roadmap-header">
          <div className="sidebar__roadmap-header--title">
            Roadmap
          </div>
          <a className="sidebar__roadmap-header--view" href='#'>
            View
          </a>
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
  name:  string,
  views: number
}
function RoadmapItem( {item}: {item: typeRoadmapItem} ) {
  return (
    <div className='sidebar__roadmap-item'>
      <div className="name-group">
        <span className="bullet" style={{ backgroundColor: item.color }}></span>
        <span className="name">{item.name}</span>
      </div>
      <div className="views">{item.views}</div>
    </div>
  )
}