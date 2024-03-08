import { BasicCard, CardBody, CardBotton, CardFooter, CardHeader } from "../../components/Card";


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
  

 




export function MiniCard() {
  return (

    <BasicCard headerRatio={30} footerRatio={20}>
    <div>바디</div>
    </BasicCard>
  )
}
