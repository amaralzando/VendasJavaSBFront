import React from "react";

const Container = (props) => {
    return (
        <div className="flex flex-col justify-center items-center">
            {props.children}
        </div>
    );
}

export default Container;