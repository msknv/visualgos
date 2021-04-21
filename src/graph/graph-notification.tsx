import { message } from 'antd';
import { CheckCircleFilled, InfoCircleFilled } from '@ant-design/icons';
import { COLOR } from '../configs/parameters';
import { SearchType } from '../common-types/SearchType.enum';

export function graphNotification(searchType: SearchType, isSuccess: boolean, isCompetition: boolean, isDark: boolean): void {
	const duration = 2;

	if (isSuccess) {
		if (searchType === SearchType.DFS) {
			message.success({
				content: `A path has been found${isCompetition ? ' by DFS' : ''}`,
				duration: duration,
				key: 'dfs-success',
				className: isDark ? 'message-dark' : '',
				icon: <CheckCircleFilled style={{color: COLOR.PATH}} />,
				onClick: () => {
					message.destroy('dfs-success');
				}
			});
		}
		if (searchType === SearchType.BFS) {
			message.success({
				content: `The shortest path has been found${isCompetition ? ' by BFS' : ''}`,
				duration: duration,
				key: 'bfs-success',
				className: isDark ? 'message-dark' : '',
				icon: <CheckCircleFilled style={{color: COLOR.PATH}} />,
				onClick: () => {
					message.destroy('bfs-success');
				}
			});
		}
	} else {
		if (searchType === SearchType.DFS) {
			message.warn({
				content: `Too many obstacles${isCompetition ? ' for DFS' : ''}, please, reload the graph`,
				duration: duration,
				key: 'dfs-warn',
				className: isDark ? 'message-dark' : '',
				icon: <InfoCircleFilled style={{color: COLOR.BLOCKED}} />,
				onClick: () => {
					message.destroy('dfs-warn');
				}
			});
		}
		if (searchType === SearchType.BFS) {
			message.warn({
				content: `Too many obstacles${isCompetition ? ' for BFS' : ''}, please, reload the graph`,
				duration: duration,
				key: 'bfs-warn',
				className: isDark ? 'message-dark' : '',
				icon: <InfoCircleFilled style={{color: COLOR.BLOCKED}} />,
				onClick: () => {
					message.destroy('bfs-warn');
				}
			});
		}
	}
}
