export interface DataTransformerModel<PreProcessed, PostProcessed> {
  transform: (data: PreProcessed) => PostProcessed;
  undoTransform: (data: PostProcessed) => PreProcessed;
}
