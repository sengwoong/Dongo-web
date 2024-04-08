import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';

interface EmailContent {
  name: string;
  email: string;
  message: string;
}

function Post(): JSX.Element {
  const [emailContent, setEmailContent] = useState<EmailContent>({
    name: '',
    email: '',
    message: ''
  });

  const [size, setSize] = useState<number>(100);
  const [intervalId, setIntervalId] = useState<number| null>(null);
  const [main, setMain] = useState<boolean>(false);
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setEmailContent({ ...emailContent, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const subject = "Inquiry from Danko Website";
    const email = "info@danko.com";
    const body = `Name: ${emailContent.name}%0D%0AEmail: ${emailContent.email}%0D%0AMessage: ${emailContent.message}`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };
  const screenWidth = window.innerWidth;
  useEffect(() => {
    console.log("main")
    console.log(main)
console.log(main)
if(screenWidth*2<size){
  setMain(true)
  console.log("size")
  console.log(size)
  
  console.log("screenWidth")
  console.log(screenWidth*2)
}

  
  }, [size, intervalId]);

  const handleMouseDown = (): void => {
    if(screenWidth*2<size){
      return
    }
    setIntervalId(setInterval(() => {
      setSize((prevSize) => prevSize + 50);
    }, 100));
  };

  const handleMouseUp = (): void => {
    if (intervalId) {
      clearInterval(intervalId);
    }
    setSize(100);
    setIntervalId(null);
  };

  const buttonStyle = {
    width: `${size}px`,
    height: `${size}px`,
    transition: 'width 0.5s, height 0.5s'
  };

  return (
    <div>
      <div 
       className={`w-screen h-screen bg-gray-800 flex justify-center items-center ${!main ? 'block' : 'hidden'}`}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      > 
        <button 
          className="bg-gray-200 rounded-full py-2 px-4" 
          style={buttonStyle} 
        >
          버튼
        </button>
      </div>


      <div className={`bg-gray-200 min-h-screen flex flex-col items-center justify-center ${main ? 'block' : 'hidden'}`}>
        {/* Intro Section */}
        <div className="max-w-4xl w-full mx-6 md:mx-auto p-8 bg-white shadow-md rounded-lg mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">단고 웹사이트</h1>
          <p className="text-lg md:text-xl text-center mb-8">저희들은 커스텀 깜빡이 영어 사이트를 제공을 합니다.</p>
          <div className="flex flex-wrap justify-center">
            <div className="w-full md:w-1/2 lg:w-1/3 p-4">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h2 className="text-xl font-semibold mb-4">단어 저장 및 불러오기</h2>
                <p className="text-gray-700">자신, 다른 사람들이 저장한 단어를 불러 공부가 가능합니다.</p>
              </div>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/3 p-4">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h2 className="text-xl font-semibold mb-4">경쟁모드</h2>
                <p className="text-gray-700">공부도 게임처럼 여러 친구들과 함께해보세요.</p>
              </div>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/3 p-4">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h2 className="text-xl font-semibold mb-4">앱으로 플레이</h2>
                <p className="text-gray-700">앱으로 플레이를 할 수 있습니다.</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Slide (Screenshots) Section */}
        <div className="max-w-4xl w-full mx-6 md:mx-auto p-8 bg-white shadow-md rounded-lg mb-8">
          {/* Your screenshot slider goes here */}
        </div>
        
        {/* App Download & Contact Section */}
        <div className="max-w-4xl w-full mx-6 md:mx-auto p-8 bg-white shadow-md rounded-lg mb-8">
          <div className="flex flex-col md:flex-row justify-center items-center">
            <a href="/path/to/your/android/app" className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-full mb-4 md:mb-0 md:mr-4 transition duration-300">Download for Android</a>
            <a href="/path/to/your/ios/app" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-full transition duration-300">Download for iOS</a>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col text-center mt-4 item-center justify-center">
            <input type="text" name="name" value={emailContent.name} onChange={handleChange} placeholder="Your Name" className="block w-full px-4 py-3 rounded-md border-gray-300 mb-4" required />
            <input type="email" name="email" value={emailContent.email} onChange={handleChange} placeholder="Your Email" className="block w-full px-4 py-3 rounded-md border-gray-300 mb-4" required />
            <textarea name="message" value={emailContent.message} onChange={handleChange} placeholder="Your Message"  className="block w-full px-4 py-3 rounded-md border-gray-300 mb-4" required></textarea>
            <button type="submit" className="bg-gray-800 hover:bg-gray-900 text-white font-semibold px-6 py-3 rounded-full transition duration-300">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Post;
