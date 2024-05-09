import React from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

const MarkdownRenderer = ({ captionView,inputText, startIndex, endIndex }) => {
  if(captionView){

  const highlightText = (htmlString, startIndex, endIndex) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    const walker = document.createTreeWalker(doc.body, NodeFilter.SHOW_TEXT);
    let currentNode;
    let index = 0;

    while ((currentNode = walker.nextNode())) {
      const nodeValueLength = currentNode.nodeValue.length;

      if (index + nodeValueLength > startIndex && index <= endIndex) {
        const span = document.createElement('span');
        span.className = 'highlight';
        const start = Math.max(startIndex - index, 0);
        const end = Math.min(endIndex - index + 1, nodeValueLength);
        span.textContent = currentNode.nodeValue.substring(start, end);

        const beforeText = document.createTextNode(currentNode.nodeValue.substring(0, start));
        const afterText = document.createTextNode(currentNode.nodeValue.substring(end));

        const parent = currentNode.parentNode;
        parent.insertBefore(beforeText, currentNode);
        parent.insertBefore(span, currentNode);
        parent.insertBefore(afterText, currentNode);
        parent.removeChild(currentNode);
      }
      index += nodeValueLength;
    }

    return doc.body.innerHTML;
  };

  const sanitizedMarkdown = DOMPurify.sanitize(marked(inputText));
  const highlightedHTML = highlightText(sanitizedMarkdown, startIndex, endIndex+5);

  return (
    <div className='p-4' dangerouslySetInnerHTML={{ __html: highlightedHTML }} />
  );
  }else{
    const parsedMarkdown = marked(inputText, { sanitize: true });
    
    return (
  <div className=' p-4  ' dangerouslySetInnerHTML={{ __html: parsedMarkdown }} />
    );
  }
};

export default MarkdownRenderer;
