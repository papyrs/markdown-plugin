import TurndownService, {Node as TurndownNode, Options} from 'turndown';

export const initTurndown = (): TurndownService => {
  const turndownService: TurndownService = new TurndownService();

  turndownService.addRule('code', {
    filter: ({nodeName}: HTMLElement, options: Options): boolean =>
      nodeName.toLowerCase() === 'code',
    replacement: (content: string, node: TurndownNode, options: Options) => {
      const element: HTMLElement = node as HTMLElement;

      return `${'```'}${element.getAttribute('language') || ''}
${element.textContent}
${'```'}`;
    }
  });

  turndownService.addRule('inline-code', {
    filter: ({nodeName}: HTMLElement, options: Options): boolean =>
      nodeName.toLowerCase() === 'mark',
    replacement: (content: string, node: TurndownNode, options: Options) => `${'`'}${content}${'`'}`
  });

  turndownService.addRule('bold', {
    filter: ({nodeName, style}: HTMLElement, options: Options): boolean =>
      nodeName.toLowerCase() === 'span' && style.fontWeight === 'bold',
    replacement: (content: string, node: TurndownNode, options: Options) => `**${content}**`
  });

  turndownService.addRule('italic', {
    filter: ({nodeName, style}: HTMLElement, options: Options): boolean =>
      nodeName.toLowerCase() === 'span' && style.fontStyle === 'italic',
    replacement: (content: string, node: TurndownNode, options: Options) => `*${content}*`
  });

  return turndownService;
};
