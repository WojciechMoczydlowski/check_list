import pathToRegexp from "path-to-regexp";

export default function reversable<TParams = void>(route: string) {
    const path = pathToRegexp.compile(route);

    function reversed(...params: TParams extends void ? [never?] : [TParams]) {
        if (!params) {
            throw "You need to define params";
        }
        return path(params[0] as any);
    }

    reversed.pattern = route;

    return reversed;
}
