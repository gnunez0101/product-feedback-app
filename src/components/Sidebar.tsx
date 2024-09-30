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
    <>
      <div className="sidebar__filters">
        <div className="sidebar__filters--items">
          {filterItems.map((item, index) => 
            <div className="filter" key={index}>{item}</div>
          )}
        </div>
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
    </>
  )
}