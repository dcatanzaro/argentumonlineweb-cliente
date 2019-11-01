import React from "react";
import style from "./style.scss";

import Header from "../header/index";
import Login from "../login/index";

class MainContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { userAgent } = this.props;

        return (
            <div className={style.container}>
                <Header userAgent={userAgent} />

                {this.props.children}

                <Login />
            </div>
        );
    }
}

export default MainContainer;
