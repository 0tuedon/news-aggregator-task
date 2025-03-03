import { IoCloseCircle } from "react-icons/io5";
import "./Wrapper.sass";
export type DrawerWrapper = {
  drawerOpen: boolean;
  setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
};
const Wrapper = ({ drawerOpen, setDrawerOpen, children }: DrawerWrapper) => {
  const handleClose = () => {
    setDrawerOpen(false);
  };
  return (
    <aside data-testid="wrapper" className={`drawer ${drawerOpen ? "open" : ""}`}>
      <div className="drawer-content">
        <div className="drawer-content__close">
          <IoCloseCircle data-testid="close-icon" onClick={handleClose} size={24} />
        </div>
        {children}
      </div>
    </aside>
  );
};

export default Wrapper;
