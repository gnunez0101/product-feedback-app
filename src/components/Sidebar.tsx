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
          <div className="sidebar__roadmap-header--view">
            View
          </div>
        </div>
        <div className="sidebar__roadmap-items">
          Planned #
          In-Progress #
          Live #
        </div>
      </div>
    </div>
  )
}