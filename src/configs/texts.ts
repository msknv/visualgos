export const texts = {
    DFS: [
        'Finds <em>the first working path</em> (not&nbsp;necessarily&nbsp;the&nbsp;shortest&nbsp;one)',
        'The further the target node is the faster it&nbsp;will&nbsp;generally&nbsp;find&nbsp;it',
        'The bottleneck in terms of space for Dfs is the&nbsp;<a href="/#/dfs-vs-bfs/edge-case-a"><em>recursive&nbsp;functions&nbsp;call&nbsp;stack</em></a>, ' +
        'here&nbsp;it&nbsp;can&nbsp;reach&nbsp;N&nbsp;max',
        'Suitable for decision exploring trees (eg. in gaming), or&nbsp;for&nbsp;visiting&nbsp;the&nbsp;entire&nbsp;graph'
    ],
    BFS: [
        'Finds <em>the shortest path</em>',
        'The closer the target node is the faster it will&nbsp;find&nbsp;it',
        'The bottleneck in terms of space for Bfs is the <a href="/#/dfs-vs-bfs/edge-case-b"><em>queue</em></a>, ' +
        'here&nbsp;it&nbsp;can&nbsp;reach&nbsp;&Sqrt;N&nbsp;max',
        'Used for finding the neighbouring nodes (eg.&nbsp;in&nbsp;network&nbsp;broadcasting,&nbsp;gps)'
    ]
};
