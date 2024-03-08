import React from 'react';

interface ChidrenProps {
    children: React.ReactNode;
    backgroundColor?: string; 
}


function selectBackgroundColor(backgroundColor: string | undefined): string {
    const colors = ["bg-blue-200", "bg-purple-200","bg-red-200"];
    if (backgroundColor && backgroundColor === "blue") {
        return colors[0];
    } else if (backgroundColor && backgroundColor === "purple") {
        return colors[1]; 
    }else if (backgroundColor && backgroundColor === "red") {
        return colors[2]; 
    }
    return ""; 
}

export const CardHeader: React.FC<ChidrenProps> = ({ children, backgroundColor }) => {
    return (
        <div className={`${selectBackgroundColor(backgroundColor)} p-4 w-full h-full flex justify-center items-center`}>
            {children}
        </div>
    );
}

export const CardBody: React.FC<ChidrenProps> = ({ children, backgroundColor }) => {
    return (
        <div className={`p-4 w-full h-full ${selectBackgroundColor(backgroundColor)}`}>
            {children}
        </div>
    );
}

export const CardFooter: React.FC<ChidrenProps> = ({ children, backgroundColor }) => {
    return (
        <div className={`${selectBackgroundColor(backgroundColor)} p-3 w-full h-full flex items-end`}>
            {children}
        </div>
    );
}

interface SlideButtonProps {
    position: 'left' | 'right';
}

export const SlideButton: React.FC<SlideButtonProps> = ({ position }) => {
    return (
        <div className={`absolute top-1/2 transform -translate-y-1/2 ${position === 'left' ? 'left-0' : 'right-0'}`}>
            {position === 'left' ? '<<' : '>>'}
        </div>
    );
}

interface CardBottonProps {
    page: number;
    totalPage: number;
}

export const CardBotton: React.FC<CardBottonProps> = ({ page, totalPage }) => {
    return (
        <div className="relative w-full">
            <SlideButton position="right" />
            <div className="text-center">
                <span className="text-lg">{`${totalPage}/${page}`}</span>
            </div>
            <SlideButton position="left" />
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
        <div className="relative w-full h-full rounded-3xl overflow-hidden"> 
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
