import { GraphNode } from '../../graph/interfaces/GraphNode.interface';

export type FindPathProgressiveSignature = (rootNode: GraphNode) => Generator;

export type FindPathStaticSignature = (rootNode: GraphNode) => boolean;

export type FindPathWrapperSignature = () => FindPathProgressiveSignature;

export type FindPathSignature = FindPathProgressiveSignature | FindPathStaticSignature | FindPathWrapperSignature;
