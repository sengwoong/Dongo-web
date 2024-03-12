import React from "react";
import {  ExamImgCard, MainCard, NoteImgCard, SaveVocaImgCard, SelectVocaImgCard } from "./components/Card";

function Home() {
  return (
    <div className="w-screen h-[66vh] rounded-3xl">
      <div className="mt-12"></div>
      <div className="flex flex-col items-center w-full h-full">
        <div className="grid grid-cols-12 gap-7 w-11/12 h-full">
          {/* 왼쪽 이미지 박스 */}
          <div className="flex flex-col col-span-3 justify-between">
            <SaveVocaImgCard headerRatio={20} footerRatio={30} ></SaveVocaImgCard>
            <div className="mb-4"></div>
            <SelectVocaImgCard headerRatio={20} footerRatio={30} ></SelectVocaImgCard>
          </div>

          {/* 중앙에 큰 사각형 */}
          <div className="col-span-6 h-full">
            <MainCard headerRatio={20} footerRatio={30} ></MainCard>
          </div>

          {/* 오른쪽 이미지 박스 */}
          <div className="flex flex-col col-span-3 justify-between">
            <NoteImgCard headerRatio={20} footerRatio={30} ></NoteImgCard>
            <div className="mb-4"></div>
            <ExamImgCard headerRatio={20} footerRatio={30} ></ExamImgCard>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
