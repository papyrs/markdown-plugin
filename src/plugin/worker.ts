import TurndownService from 'turndown';
import {save} from './utils/save.utils';
import {initTurndown} from './utils/turndown.utils';
import {extractParagraphs} from './utils/paragraphs.utils';

const toMarkdown = (paragraphs: string[]): string[] => {
  const turndownService: TurndownService = initTurndown();

  return paragraphs.map((paragraph: string) => turndownService.turndown(paragraph));
};

(async () => {
  const paragraphs: string[] = extractParagraphs();

  const markdown: string[] = toMarkdown(paragraphs);

  const blob: Blob = new Blob([markdown.join('\n')], {
    type: 'text/plain'
  });

  await save({blob});
})();
