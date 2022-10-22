// import Sidebar from "./Sidebar";

const Layout = ({
  onWeekClick,
  onYesterdayClick,
  onSessionClick,
  onTodayClick,
  children,
}) => {
  return (
    <>
      {/* <Sidebar
        // these props aren't actually used...
        onYesterdayClick={onYesterdayClick}
        onTodayClick={onTodayClick}
        onSessionClick={onSessionClick}
        onWeekClick={onWeekClick}
      /> */}
      {children}
    </>
  );
};

export default Layout;
