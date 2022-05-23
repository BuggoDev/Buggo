import { FC } from "react";
import Header from "./Header";
import About from "./About";
import Team from "./Team";

const Dashboard: FC<{}> = () => {
  return (
    <>
      <Header />
      <About />
      <Team />
    </>
  );
};

export default Dashboard;
