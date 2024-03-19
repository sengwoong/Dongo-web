// LoadingBar.tsx
import React from "react";
import ReactDOM from "react-dom";
import { css } from "@emotion/react";
import { ClipLoader } from "react-spinners";

interface LoadingBarProps {
    loading: boolean;
}

const LoadingBar: React.FC<LoadingBarProps> = ({ loading }) => {
    return ReactDOM.createPortal(
        loading && (
            <div className="loading-bar">
                <ClipLoader color={"#36D7B7"} loading={loading} size={50} />
            </div>
        ),
        document.body
    );
};

export default LoadingBar;
