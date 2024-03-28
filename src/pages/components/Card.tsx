import { useNavigate } from "react-router-dom";
import { CardBody, CardBotton, CardFooter, CardHeader, CardWrapper } from "../../components/Card";
import { RoundBlueButton } from "../../components/RoundButton";
import { paramKeys } from "../../../utils/Params";


interface MiniCardProps {
  headerRatio: number;
  bodyRatio: number;
}


export default function CardComponent({ headerRatio, bodyRatio }: MiniCardProps): JSX.Element {
  const headerSize = (100 / (headerRatio + bodyRatio)) * headerRatio
  const bodySize = (100 / (headerRatio + bodyRatio)) * bodyRatio
  return (
      <CardWrapper>
      <div className='rounded-3xl' style={{ height: `${headerSize}%` }}>
        <CardHeader backgroundColor='blue'>Header</CardHeader>
      </div>
      <div className="flex flex-col justify-center items-cente text-center" style={{height: `${ bodySize}%` }}>
        <CardBody backgroundColor='red'>베이직카드</CardBody>
      </div>   
      </CardWrapper>
  );
}

interface CardProps {
  headerRatio: number;
  footerRatio: number;
}


export function BasicCard({ headerRatio, footerRatio }: CardProps): JSX.Element {
  return (
    <CardWrapper >
      <div className='rounded-3xl' style={{ height: `${headerRatio}%` }}>
        <CardHeader backgroundColor='blue'>Header</CardHeader>
      </div>
      <div style={{ height: `${100 - headerRatio - footerRatio}%` }}>
        <CardBody backgroundColor='red'>베이직카드</CardBody>
      </div>
      <div style={{ height: `${footerRatio}%` }}>
        <CardFooter backgroundColor='blue'><CardBotton page={2} totalPage={10} /></CardFooter>
      </div>
    </CardWrapper>
  );
}


export function MainCard({ headerRatio, footerRatio }: CardProps): JSX.Element {

  const navigate = useNavigate();

  const GotoPost = () => {
    console.log("GotoPost");
    navigate(`/${paramKeys.Post}`);
    console.log(paramKeys.Post);
  };

  return (
    <CardWrapper >
    <div className="w-full h-full relative" style={{ backgroundImage: "url('img/boling.png')", backgroundSize: "cover", backgroundPosition: "50% 0"  }}>
      <div className=' w-full h-full text-center'>
        <div className='rounded-3xl' style={{ height: `${headerRatio}%` }}>
          <CardHeader><p className="text-4xl mt-4 text"> 단고 다운 방법</p></CardHeader>
        </div>
        <div style={{ height: `${100 - headerRatio - footerRatio}%` }}>
          <CardBody>
            <div className="flex flex-col items-center">
              <p className="text-lg text-center">
                나만의 커스텀 단어맛집 단고
              </p>
              <p className="text-lg text-center">
                공부를 게임과 같이!
              </p>
            </div>
          </CardBody>
        </div>
        <div style={{ height: `${footerRatio}%` }}>
          <CardFooter>
            <div className="flex justify-between items-center w-11/12">
              <p>설명 페이지로 이동하기</p>
              <RoundBlueButton onClick={GotoPost}> {/* 괄호를 제거하여 함수를 전달합니다 */}
                <p className="text-sm">Click</p>
              </RoundBlueButton>               
            </div>
          </CardFooter>
        </div>
      </div>
    </div>
    </CardWrapper>
  );
}


export function SaveVocaImgCard({ headerRatio, footerRatio }: CardProps): JSX.Element {
  const navigate = useNavigate();

  const CreateVoca = () => {
    navigate(`/${paramKeys.CreateVoca}`); 
    }
  
    return (
      <CardWrapper >
      <div className="w-full h-full relative" style={{ backgroundImage: "url('img/save.png')", backgroundSize: "cover", backgroundPosition: "50% 0"  }}>
        <div className=' w-full h-full text-center'>
          <div className='rounded-3xl' style={{ height: `${headerRatio}%` }}>
            <CardHeader><p className="text-xl mt-4 text">단어저장</p></CardHeader>
          </div>
          <div style={{ height: `${100 - headerRatio - footerRatio}%` }}>
            <CardBody>
              <div className="flex flex-col items-center">
                <p className="text-center text-md">
                    저장 으로 이동
                </p>
              </div>
            </CardBody>
          </div>
          <div style={{ height: `${footerRatio}%` }}>
            <CardFooter>
              <div className="flex justify-end items-center w-11/12">
              <RoundBlueButton onClick={CreateVoca}>
              <p className="text-sm">Click</p>
              </RoundBlueButton>               
              </div>
            </CardFooter>
          </div>
        </div>
      </div>
      </CardWrapper>
    );
  }
  

export function MyVocaImgCard({ headerRatio, footerRatio }: CardProps): JSX.Element {
  const navigate = useNavigate();

  const Vocabulary = () => {
    navigate(`/${paramKeys.Vocabulary}`); 
    }


    return (
      <CardWrapper>
      <div className="w-full h-full relative" style={{ backgroundImage: "url('img/search.png')", backgroundSize: "cover", backgroundPosition: "50% 0"  }}>
        <div className=' w-full h-full text-center'>
          <div className='rounded-3xl' style={{ height: `${headerRatio}%` }}>
            <CardHeader><p className="text-xl mt-4 text"> 단어장 이동</p></CardHeader>
          </div>
          <div style={{ height: `${100 - headerRatio - footerRatio}%` }}>
            <CardBody>
              <div className="flex flex-col items-center">
                <p className="text-center text-md">
                    단어장으로 으로 이동
                </p>
              
              </div>
            </CardBody>
          </div>
          <div style={{ height: `${footerRatio}%` }}>
            <CardFooter>
              <div className="flex justify-end items-center w-11/12">
              <RoundBlueButton onClick={Vocabulary}>
              <p className="text-sm">Click</p>
              </RoundBlueButton>               
              </div>
            </CardFooter>
          </div>
        </div>
      </div>
      </CardWrapper>
    );
  }
  

export function CreatExamImgCard({ headerRatio, footerRatio }: CardProps): JSX.Element {
  const navigate = useNavigate();

  const CreateExam = () => {
    navigate(`/${paramKeys.CreateExam}`); 
    }
    return (
      <CardWrapper>
      <div className="w-full h-full relative" style={{ backgroundImage: "url('img/voca.png')", backgroundSize: "cover", backgroundPosition: "50% 0"  }}>
        <div className=' w-full h-full text-center'>
          <div className='rounded-3xl' style={{ height: `${headerRatio}%` }}>
            <CardHeader><p className="text-xl mt-4 text">시험지 저장</p></CardHeader>
          </div>
          <div style={{ height: `${100 - headerRatio - footerRatio}%` }}>
            <CardBody>
              <div className="flex flex-col items-center">
                <p className="text-center text-md">
                   시험지로 이동
                </p>
              
              </div>
            </CardBody>
          </div>
          <div style={{ height: `${footerRatio}%` }}>
            <CardFooter>
              <div className="flex justify-end items-center w-11/12">
              <RoundBlueButton onClick={CreateExam}>
              <p className="text-sm">Click</p>
              </RoundBlueButton>               
              </div>
            </CardFooter>
          </div>
        </div>
      </div>
      </CardWrapper>
    );
  }
  
  export function DownLoadImgCard({ headerRatio, footerRatio }: CardProps): JSX.Element {

    const navigate = useNavigate();
  
    const DownLoad = () => {
      navigate(`/${paramKeys.DownLoad}`); 
    }
  
    return (
      <CardWrapper>
        <div className="w-full h-full relative" style={{ backgroundImage: "url('img/search.png')", backgroundSize: "cover" , backgroundPosition: "50% 0" }}>
          <div className=' w-full h-full text-center'>
            <div className='rounded-3xl' style={{ height: `${headerRatio}%` }}>
              <CardHeader><p className="text-xl mt-4 text-black">다운로드 항목으로 이동</p></CardHeader>
            </div>
            <div style={{ height: `${100 - headerRatio - footerRatio}%` }}>
              <CardBody>
                <div className="flex flex-col items-center">
                  <p className="text-center text-md text-black">
                      다운로드 관리
                  </p>
                </div>
              </CardBody>
            </div>
            <div style={{ height: `${footerRatio}%` }}>
              <CardFooter>
                <div className="flex justify-end items-center w-11/12">
                  <RoundBlueButton onClick={DownLoad}> 
                    <p className="text-sm text-white">Click</p>
                  </RoundBlueButton>               
                </div>
              </CardFooter>
            </div>
          </div>
        </div>
      </CardWrapper>
    );
  }

  