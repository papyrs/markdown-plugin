export const extractParagraphs = (): string[] => {
  const article: HTMLElement | null = document.querySelector('deckgo-doc > article');

  if (!article) {
    return [];
  }

  // Turndown addRule seems to not work with Web Components therefore we transform these to standard Node in advance
  const toImg = (element: HTMLElement): string => {
    const img: HTMLImageElement = document.createElement('img');
    img.setAttribute('src', element.getAttribute('img-src') || '');

    return `${img.outerHTML}<br/>`;
  };

  const toCode = (element: HTMLElement): string => {
    if (!element.firstElementChild || element.firstElementChild.nodeName.toLowerCase() !== 'code') {
      return element.outerHTML;
    }

    const pre: HTMLElement = document.createElement('pre');
    pre.innerHTML = element.firstElementChild.innerHTML;

    const language: string = element.getAttribute('language') || 'javascript';

    const code: HTMLElement = document.createElement('code');
    code.setAttribute('language', language);
    code.appendChild(pre);

    // We add a line break here because \n seems to have no effect in the addRule of turndown when we parse block of code
    return `<br/>${code.outerHTML}`;
  };

  const cleanZeroLengthWidth = (html: string) => html.replace(/\u200B/g, '');

  return Array.from(article.childNodes)
    .filter(({nodeType}: Node) => [Node.TEXT_NODE, Node.ELEMENT_NODE].includes(nodeType))
    .map((node: Node) => {
      if (Node.TEXT_NODE === node.nodeType) {
        return node.nodeValue || '';
      }

      const element: HTMLElement = node as HTMLElement;

      if (element.nodeName.toLowerCase() === 'deckgo-lazy-img') {
        return toImg(element);
      }

      if (element.nodeName.toLowerCase() === 'deckgo-highlight-code') {
        return toCode(element);
      }

      return element.outerHTML;
    })
    .map((html: string) => cleanZeroLengthWidth(html));
};
