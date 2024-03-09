import {  CardBody, CardBotton, CardFooter, CardHeader } from "../../components/Card";


export default  function CardComponent() {
    return (
      <div className="card-container">
        <div className="card">
          <CardHeader>Header</CardHeader>
          <CardBody>Body Content</CardBody>
          <CardFooter>Footer Content</CardFooter>
          <CardBotton page={2} totalPage={10} />
        </div>
      </div>
    );
  }
  

 







interface CardProps {
    headerRatio: number;
    footerRatio: number;
    children: React.ReactNode;
}
export function BasicCard({ headerRatio, footerRatio, children }: CardProps): JSX.Element {
    return (
        <div className="relative w-full h-full rounded-3xl overflow-hidden"   
        > 
       
            <div className='rounded-3xl' style={{ height: `${headerRatio}%` }}>
                <CardHeader backgroundColor='blue'>Header</CardHeader>
            </div>
            <div style={{ height: `${(100 - headerRatio - footerRatio)}%` }}>
                <CardBody  backgroundColor='red'>{children}</CardBody>
            </div>
            <div style={{ height: `${footerRatio}%` }}>
                <CardFooter  backgroundColor='blue'><CardBotton page={2} totalPage={10} /></CardFooter>
            </div>

      
        </div>
    );
}


export function ImgCard({ headerRatio, footerRatio, children }: CardProps): JSX.Element {
    return (
        <div className="relative w-full h-full rounded-3xl overflow-hidden"   
        > 
          <img className=" absolute  w-full h-full  opacity-75" alt="같이 공부해요 단고" src="img/boling.png" />
      <div className=' absolute w-full h-full'>
       
            <div className='rounded-3xl' style={{ height: `${headerRatio}%` }}>
                <CardHeader >Header</CardHeader>
            </div>
            <div style={{ height: `${(100 - headerRatio - footerRatio)}%` }}>
                <CardBody >{children}</CardBody>
            </div>
            <div style={{ height: `${footerRatio}%` }}>
                <CardFooter  ><CardBotton page={2} totalPage={10} /></CardFooter>
            </div>
        </div>
      
        </div>
    );
}








export function MiniCard() {
  return (

    <BasicCard headerRatio={30} footerRatio={20}>
    <div>바디</div>
    </BasicCard>
  )
}


export function DongoImgCard() {
    return (
  
      <ImgCard headerRatio={30} footerRatio={20}>
      <div>바디</div>
      </ImgCard>
    )
  }
  