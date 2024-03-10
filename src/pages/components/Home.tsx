import React from "react";
import { DongoImgCard, MiniCard } from "./Card";
import SwitchButton from "../../components/CreateSlideBtn";
import SelectableTitleList from "../../components/CrateSelectableTitleList";
import SearchBox from "../../components/CreateSearch";

function Home() {


  const titles: string[] = ['Title 1', 'Title 2', 'Title 3'];




  return <div className=" w-screen h-72 rounded-3xl">
      <div>
  <h1>Select a title:</h1>
  <SelectableTitleList titles={titles} />
</div>
<SearchBox onSearch={function (query: string): void {
      throw new Error("Function not implemented.");
    } }></SearchBox>
    <SwitchButton titles={["asd1a","aa2a","aa3","asdasd","qweqwe"]}></SwitchButton>
</div>
}

export default Home;
