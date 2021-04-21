import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { AppRoute } from '../common-types/AppRoute.type';
import { ReactNode } from 'react';

type NavigationProps = {
	routes: AppRoute[],
	isMain?: boolean
};

export function Navigation({ routes, isMain = false }: NavigationProps) {
	const routesLinks: ReactNode[] = routes.map<ReactNode>((routeItem: AppRoute, i) => {
		const { url, umbrella, text, textMobile, icon } = routeItem;
		const navText = (() => {
			if (isMain) {
				return (
					<>
						<span className="nav-text is-mobile">
							{icon}
							{textMobile}
						</span>
						<span className="nav-text is-desktop">{text}</span>
					</>
				);
			}
			return text;
		})();
		return(
			<NavLink
				key={i}
				to={url}
				className="nav-link"
				activeClassName="is-active"
				isActive={(match, location) => {
					if (isMain) {
						if (umbrella && location.pathname.match(umbrella)) {
							return true;
						}
					}
					return !!match;
				}}
			>
				{navText}
			</NavLink>
		);
	});
	
	return <nav className={`nav${isMain ? ' is-main' : ' is-secondary'}`}>{routesLinks}</nav>;
}
