export interface LetterData {
  date: string;
  writerName: string;
  writingTitle: string;
  contentScore: number | string;
  expressionScore: number | string;
  languageScore: number | string;
  structureScore: number | string;
  overallScore: number | string;
  editorReview: string;
}

export const ORIGINAL_TEMPLATE_DATA: LetterData = {
  date: '05/04/2026',
  writerName: 'Tanishka Lalwani',
  writingTitle: 'That type of woman',
  contentScore: 90,
  expressionScore: 95,
  languageScore: 85,
  structureScore: 98,
  overallScore: 93,
  editorReview: 'Very strong with minor weaknesses',
};
