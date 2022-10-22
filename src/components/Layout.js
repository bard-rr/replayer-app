import Topbar from "./Topbar";
const Layout = ({
  onWeekClick,
  onYesterdayClick,
  onSessionClick,
  onTodayClick,
  children,
}) => {
  return (
    <>
      <Topbar />
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
