import { ReactNode } from 'react';
import { SearchType } from '../common-types/SearchType.enum';

type LegendProps = {
	isProgressive: boolean,
	searchType?: SearchType,
	isCompetition?: boolean,
	isEdgeCase?: boolean
};

type LegendKind = 'is-unvisited'
	| 'is-obstacle'
	| 'is-visited'
	| 'is-blocked'
	| 'is-path'
	| 'is-target'
	| 'is-path-target'
	| 'is-visited-root'
	| 'is-blocked-root';

type LegendItem = {
	type: LegendKind,
	text: string,
	title?: string
};

export function Legend(props: LegendProps) {
	const { searchType, isProgressive = true, isCompetition, isEdgeCase } = props;

	const itemsRaw: LegendItem[] = [
		{type: 'is-unvisited', text: 'Unvisited'},
		{type: 'is-obstacle', text: 'Obstacle'},
		{type: 'is-visited', text: 'Visited'},
		{type: 'is-blocked', text: 'Cul-de-sac (Dfs only)', title: 'Node or link that has been visited, but hasn\'t led to the target node' },
		{type: 'is-path', text: 'Path'},
		{type: 'is-target', text: 'Root/Target'},
		{type: 'is-path-target', text: 'Path Root/Target'},
		{type: 'is-visited-root', text: 'Visited Root/Target'},
		{type: 'is-blocked-root', text: 'Cul-de-sac Root (Dfs only)'}
	];

	const isOnlyForStaticDfs = (type: string) => {
		return type !== 'is-visited' && type !== 'is-visited-root';
	};

	const isOnlyForBfs = (type: string) => {
		return type !== 'is-blocked' && type !== 'is-blocked-root';
	};
	
	const legendItemsRaw: LegendItem[] = itemsRaw.filter(({ type }: LegendItem) => {
		if (isCompetition) {
			if (isEdgeCase) {
				return isOnlyForBfs(type) && type !== 'is-obstacle';
			}
			return true;
		}
		if (searchType === 'DFS') {
			if (isProgressive) return true;
			return isOnlyForStaticDfs(type);
		} else {
			if (isProgressive) return isOnlyForBfs(type);
			return isOnlyForBfs(type);
		}
	});
	
	const legendItems: ReactNode[] = legendItemsRaw.map<ReactNode>((legendItem: LegendItem, i) => {
		const { type, text, title } = legendItem;
		return (
			<li key={i} className="legend-item" title={title || ''}>
				<span className={`circle ${type}`} />
				<span className="text">{text}</span>
			</li>
		);
	});
	
	return (
		<section className="legend">
			<ul className={`legend-list${isEdgeCase ? ' is-edge-case' : ''}`}>
				{legendItems}
			</ul>
		</section>
	);
}
