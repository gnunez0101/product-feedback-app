import Sidebar from "./Sidebar";

export default function() {
  return (
    <>
      <div className="header">
        <div className="header__title">
          Frontend Mentor
        </div>
        <div className="header__subtitle">
          Feedback Board
        </div>
      </div>
      <Sidebar />
    </>
  )
}