/**
 * 路由装饰器
 * **/
const guard = (router) => {
    if (!!router) {
        router.beforeResolve((to, from, next) => {
            // console.log(`[ROUTER_TO]${ to.path } [ROUTER_QUERY] ${ JSON.stringify( to.query ) }`); 
            // console.log(`[ROUTER_from]${ from.path } [ROUTER_QUERY] ${ JSON.stringify( from.query )}`);
            // console.log(`-`.repeat(100));
            next();
        });
    }
}

export default guard;