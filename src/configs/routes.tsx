import { NodeIndexOutlined, OneToOneOutlined, SisternodeOutlined, SubnodeOutlined } from '@ant-design/icons';

export const routes = {
    main: [
        { url: '/dfs/progressive', umbrella: '/dfs/', text: 'depth-first search', textMobile: 'dfs', icon: <SubnodeOutlined /> },
        { url: '/bfs/progressive', umbrella: '/bfs/', text: 'breadth-first search', textMobile: 'bfs', icon: <SisternodeOutlined /> },
        { url: '/dfs-vs-bfs/progressive', umbrella: '/dfs-vs-bfs/', text: 'dfs-vs-bfs', textMobile: 'vs', icon: <OneToOneOutlined /> },
        { url: '/onboarding', text: 'onboarding', textMobile: 'about', icon: <NodeIndexOutlined /> }
    ],
    dfs: [
        { url: '/dfs/progressive', text: 'progressive' },
        { url: '/dfs/static', text: 'static' }
    ],
    bfs: [
        { url: '/bfs/progressive', text: 'progressive' },
        { url: '/bfs/static', text: 'static' }
    ],
    dfsVsBfs: [
        { url: '/dfs-vs-bfs/progressive', text: 'progressive' },
        { url: '/dfs-vs-bfs/static', text: 'static' },
        { url: '/dfs-vs-bfs/edge-case-a', text: 'edge-case-1' },
        { url: '/dfs-vs-bfs/edge-case-b', text: 'edge-case-2' }
    ]
};
