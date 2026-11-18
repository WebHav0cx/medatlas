'use client';
import NextLink from 'next/link';
import { usePathname, useRouter, useSearchParams as useNextSearchParams } from 'next/navigation';
import { Children, createContext, isValidElement, useContext, useEffect } from 'react';
import type { ComponentProps, ReactElement, ReactNode } from 'react';
const ParamsContext=createContext<Record<string,string>>({});
type LinkProps=Omit<ComponentProps<typeof NextLink>,'href'>&{to:string; 'data-slot'?:string; activeClassName?:string};
export function Link({to,...props}:LinkProps){return <NextLink href={to} {...props}/>;}
export function NavLink({to,className,activeClassName,...props}:LinkProps){const path=usePathname();const active=path===to||path.startsWith(to+'/');return <NextLink href={to} aria-current={active?'page':undefined} className={active && activeClassName ? activeClassName : className} {...props} data-slot={[props['data-slot'],active?'active':''].filter(Boolean).join(' ')}/>;}
export function useLocation(){const pathname=usePathname(),search=useNextSearchParams().toString();return {pathname,search:search?'?'+search:''};}
export function useNavigate(){const router=useRouter();return(to:string)=>router.push(to);}
export function useParams(){return useContext(ParamsContext);}
export function useSearchParams(){return [useNextSearchParams()] as const;}
interface RouteProps {path?:string;index?:boolean;element:ReactElement;}
export function Route(_props:RouteProps){return null;}
export function Routes({children}:{children:ReactNode}){const pathname=usePathname();const relative=pathname.split('/').slice(2).join('/');const routes=Children.toArray(children).filter((child):child is ReactElement<RouteProps>=>isValidElement<RouteProps>(child));let fallback:ReactNode=null;
 for(const route of routes){if(route.props.path==='*'){fallback=route.props.element;continue;}const pattern=route.props.index?'':route.props.path??'';const parts=pattern.split('/'),actual=relative.split('/');if(parts.length!==actual.length)continue;const params:Record<string,string>={};if(parts.every((part,index)=>{if(part.startsWith(':')){params[part.slice(1)]=decodeURIComponent(actual[index]);return true;}return part===actual[index];}))return <ParamsContext.Provider value={params}>{route.props.element}</ParamsContext.Provider>;}
 return fallback;
}
export function Navigate({to,replace=false}:{to:string;replace?:boolean}){const router=useRouter(),pathname=usePathname();const destination=to.startsWith('/')?to:`/${pathname.split('/')[1]}/${to}`;useEffect(()=>{if(pathname!==destination){if(replace)router.replace(destination);else router.push(destination);}},[router,pathname,destination,replace]);return null;}
