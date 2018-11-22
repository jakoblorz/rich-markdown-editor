// @flow
import * as React from "react";
import { map } from "lodash";
import styled from "styled-components";
import type { SlateNodeProps } from "../types";
import CopyButton from "./CopyButton";

function getCopyText(node) {
  return node.nodes.reduce((memo, line) => `${memo}${line.text}\n`, "");
}

const languages = {
  css: "CSS",
  clike: "C",
  csharp: "C#",
  markup: "HTML",
  java: "Java",
  javascript: "JavaScript",
  php: "PHP",
  python: "Python",
  ruby: "Ruby",
  typescript: "TypeScript",
};

export default function CodeBlock({
  children,
  node,
  readOnly,
  attributes,
  editor,
}: SlateNodeProps) {
  const { data } = node;
  const language = data.get("language") || "javascript";

  const onSelectLanguage = ev => {
    editor.change(change =>
      change.setNodeByKey(node.key, {
        data: { ...data, language: ev.target.value },
      })
    );
  };

  return (
    <Container {...attributes} spellCheck={false}>
      {readOnly && <CopyButton text={getCopyText(node)} />}
      <Code>{children}</Code>
      {!readOnly && (
        <Language onChange={onSelectLanguage} contentEditable={false}>
          {map(languages, (name, value) => (
            <option key={value} value={value} selected={language === value}>
              {name}
            </option>
          ))}
        </Language>
      )}
    </Container>
  );
}

/*
Based on Prism template by Bram de Haan (http://atelierbram.github.io/syntax-highlighting/prism/)
Original Base16 color scheme by Chris Kempson (https://github.com/chriskempson/base16)
*/
const Code = styled.code`
  display: block;
  overflow-x: scroll;
  padding: 0.5em 1em;
  line-height: 1.4em;

  pre {
    -webkit-font-smoothing: initial;
    font-family: ${props => props.theme.fontFamilyMono}
    font-size: 13px;
    direction: ltr;
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    -moz-tab-size: 4;
    -o-tab-size: 4;
    tab-size: 4;
    -webkit-hyphens: none;
    -moz-hyphens: none;
    -ms-hyphens: none;
    hyphens: none;
    color: ${props => props.theme.code};
    margin: 0;
    overflow: auto;
  }

  .token.comment,
  .token.prolog,
  .token.doctype,
  .token.cdata {
    color: #6a737d;
  }

  .token.punctuation {
    color: #5e6687;
  }

  .token.namespace {
    opacity: .7;
  }

  .token.operator,
  .token.boolean,
  .token.number {
    color: #d73a49;
  }

  .token.property {
    color: #c08b30;
  }

  .token.tag {
    color: #3d8fd1;
  }

  .token.string {
    color: #032f62;
  }

  .token.selector {
    color: #6679cc;
  }

  .token.attr-name {
    color: #c76b29;
  }

  .token.entity,
  .token.url,
  .language-css .token.string,
  .style .token.string {
    color: #22a2c9;
  }

  .token.attr-value,
  .token.keyword,
  .token.control,
  .token.directive,
  .token.unit {
    color: #d73a49;
  }

  .token.function {
    color: #6f42c1;
  }

  .token.statement,
  .token.regex,
  .token.atrule {
    color: #22a2c9;
  }

  .token.placeholder,
  .token.variable {
    color: #3d8fd1;
  }

  .token.deleted {
    text-decoration: line-through;
  }

  .token.inserted {
    border-bottom: 1px dotted #202746;
    text-decoration: none;
  }

  .token.italic {
    font-style: italic;
  }

  .token.important,
  .token.bold {
    font-weight: bold;
  }

  .token.important {
    color: #c94922;
  }

  .token.entity {
    cursor: help;
  }
`;

const Language = styled.select`
  position: absolute;
  bottom: 2px;
  right: 2px;
  opacity: 0;
`;

const Container = styled.div`
  position: relative;
  background: ${props => props.theme.codeBackground};
  border-radius: 4px;
  border: 1px solid ${props => props.theme.codeBorder};

  &:hover {
    > span {
      opacity: 1;
    }

    ${Language} {
      opacity: 1;
    }
  }
`;
