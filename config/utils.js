import Router from "next/router";
import urls from "./urls.json";
import config from "../config";
import getConfig from "next/config";
import fetch from "isomorphic-fetch";
import _ from "lodash";

export async function fetchUrl(url, options = {}) {
    const env = getConfig().publicRuntimeConfig.backend_url;

    const response = await fetch(config.api(env) + url, options);

    const result = await response.json();

    return result;
}

export function routerPush(href, query = "", blank) {
    if (blank) {
        return window.open(href, "_blank");
    }

    const url = buildUrl(href);

    Router.push(url.href + query, url.as + query);
}

export function buildUrl(href) {
    const splitHref = href.split("/");

    if (splitHref.length > 2) {
        for (let index in urls) {
            if (index.indexOf("/" + splitHref[1]) > -1) {
                let asHref = urls[index];
                let tmpUrl = href.replace("/" + splitHref[1], "");

                return {
                    href: asHref + tmpUrl,
                    as: href
                };
            }
        }
    }

    return {
        href: urls[href],
        as: href
    };
}
