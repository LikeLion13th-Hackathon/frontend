import ReactMarkdown from "react-markdown";
import styled from "styled-components";

const MD = styled.div`
  font-size: 12px;
  line-height: 1.65;
  color: #444;

  /* specificity 올리기 */
  && h1, && h2, && h3 { font-weight: 600; margin: 8px 0 4px; }
  && h1 { font-size: 13px; }
  && h2 { font-size: 12px; }
  && h3 { font-size: 12px; }

  && p { margin: 4px 0; }
  && ul, && ol { margin: 6px 0; padding-left: 18px; }
  && li { margin: 2px 0; }
`;

export default function TermsContent({ md }) {
  const text = Array.isArray(md) ? md.join("\n\n") : md; // 배열이면 합치기
  return (
    <MD>
      <ReactMarkdown>{text}</ReactMarkdown>
    </MD>
  );
}