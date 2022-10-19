import Sidebar from "./Sidebar";

const Layout = ({
  onWeekClick,
  onYesterdayClick,
  onSessionClick,
  onTodayClick,
  children,
}) => {
  return (
    <>
      <Sidebar
        onYesterdayClick={onYesterdayClick}
        onTodayClick={onTodayClick}
        onSessionClick={onSessionClick}
        onWeekClick={onWeekClick}
      />
      {children}
    </>
  );
};

export default Layout;
