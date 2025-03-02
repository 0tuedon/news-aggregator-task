import { IoCloseCircle } from "react-icons/io5"
import "./Wrapper.sass"
export type DrawerWrapper = {
    drawerOpen: boolean
    setDrawerOpen:React.Dispatch<React.SetStateAction<boolean>>
    children:React.ReactNode
}
const Wrapper = ({drawerOpen, setDrawerOpen, children}:DrawerWrapper) => {
  const handleClose = () => {
    setDrawerOpen(false)   
  }
  return (
    <aside className={`drawer ${drawerOpen ? "open" : ""}`}>
    <div className="drawer-content">
    <div className="drawer-content__close">
          <IoCloseCircle onClick={handleClose} size={24} />
        </div>
        {children}
      {/* <h2>Filters</h2>
      <div className="drawer-content__body">
        <div className="drawer-content__filter">
          <label htmlFor="date">Date From</label>
          <DatePicker
            id="dateFrom"
            showIcon
            selected={new Date(dateFrom)}
            onChange={(date) => handleDateChange(date, "start")}
          />
        </div>

        <div className="drawer-content__filter">
          <label htmlFor="date">Date To</label>
          <DatePicker
            id="dateTo"
            showIcon
            selected={new Date(dateTo)}
            onChange={(date) => handleDateChange(date, "end")}
          />
        </div>

        <div className="drawer-content__filter">
          <label htmlFor="date">Pick All Sources</label>
          {allSources.map((source) => (
            <div key={source.value}>
              <input
                onChange={handleCheckboxChange}
                type="checkbox"
                id={source.value}
                name={source.name}
                value={source.value}
                defaultChecked={sources.includes(source.value)}
              />
              <label htmlFor={source.value}>{source.name}</label>
            </div>
          ))}
        </div>
      </div>

      User Preferences 
 */}
    </div>
  </aside>
  )
}

export default Wrapper