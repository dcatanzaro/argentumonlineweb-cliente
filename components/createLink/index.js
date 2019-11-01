import { Component } from "react";
import { connect } from "react-redux";

import Link from "next/link";
import { buildUrl } from "../../config/utils";

class CreateLink extends Component {
    render() {
        const { children, href } = this.props;
        const url = buildUrl(href);

        return (
            <Link href={url.href} as={url.as}>
                {children}
            </Link>
        );
    }
}

export default connect()(CreateLink);
