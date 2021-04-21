import { GraphData } from '../../graph/interfaces/GraphData.interface';
import { SearchType } from '../../common-types/SearchType.enum';

export type AlgoPageProps = {
    showLegend?: boolean,
    isCompetition?: boolean,
    graphData?: GraphData,
    isProgressive?: boolean,
    speed?: number,
    searchType?: SearchType
};
