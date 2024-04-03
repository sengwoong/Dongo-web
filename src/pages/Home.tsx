import React from "react";
import {  DownLoadImgCard, MainCard, CreatExamImgCard, SaveVocaImgCard, MyVocaImgCard } from "./components/Card";

function Home() {
  return (
    <div className="w-screen h-[66vh] rounded-3xl">
      <div className="mt-12"></div>
      <div className="flex flex-col items-center w-full h-full">
        <div className="grid grid-cols-12 gap-7 w-11/12 h-full">
          
          <div className="flex flex-col col-span-3 justify-between">
            <div>
            <SaveVocaImgCard headerRatio={20} footerRatio={30} ></SaveVocaImgCard>
            </div>
            <div className="mb-4"></div>
            <MyVocaImgCard headerRatio={20} footerRatio={30} ></MyVocaImgCard>
          </div>

          <div className="col-span-6 h-full">
            <MainCard headerRatio={20} footerRatio={30} ></MainCard>
          </div>

          <div className="flex flex-col col-span-3 justify-between">
            <DownLoadImgCard headerRatio={20} footerRatio={30} ></DownLoadImgCard>
            <div className="mb-4"></div>
            <CreatExamImgCard headerRatio={20} footerRatio={30} ></CreatExamImgCard>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default Home;
