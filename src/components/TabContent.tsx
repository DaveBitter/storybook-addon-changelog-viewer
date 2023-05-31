import React, { useMemo } from "react";
import { styled } from "@storybook/theming";
import { UL, LI, A } from "@storybook/components";
import { marked } from "marked";
// @ts-expect-error
import { mangle } from "marked-mangle";
// @ts-expect-error
import { gfmHeadingId } from "marked-gfm-heading-id";

marked.use(mangle());
marked.use(gfmHeadingId());

const TabWrapper = styled.div`
  background: ${({ theme }) => theme.background.content};
  min-height: 100vh;
  box-sizing: border-box;
`;

const TabInner = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;
  gap: 2rem;

  @media (min-width: 960px) {
    flex-direction: row;
    gap: 5rem;
  }
`;

const TabAside = styled.aside`
  flex-shrink: 0;
  max-height: 40vh;
  overflow-y: auto;
  padding: 2rem;
  padding-bottom: 0;
  border-bottom: 2px solid ${({ theme }) => theme.appBorderColor};

  ul {
    margin-top: 0;
    padding-left: 1rem;
  }

  @media (min-width: 960px) {
    position: fixed;
    top: ${({ theme }) => `${theme.layoutMargin}px`};
    bottom: 0;
    left: 0;
    width: 15rem;
    max-height: 100vh;
    margin-top: 4rem;
    padding-top: 0;
    padding-right: 0;
    border-right: 2px solid ${({ theme }) => theme.appBorderColor};
  }
`;

const TabMain = styled.main`
  padding: 2rem;
  padding-top: 0;

  @media (min-width: 960px) {
    padding-top: 2rem;
    padding-right: 0;
    margin-left: 15rem;
  }
`;

interface TabContentProps {
  markdown: string;
}

function findHeadingsWithSemVer(htmlString: string) {
  const parser = new DOMParser();
  const dom = parser.parseFromString(htmlString, "text/html");
  const headings = dom.querySelectorAll("h1, h2, h3, h4, h5, h6");
  const result = [];

  for (let i = 0; i < headings.length; i++) {
    const heading = headings[i];
    const text = heading.textContent;
    const matches = text.match(/\d+\.\d+\.\d+/);

    if (matches) {
      const id = heading.getAttribute("id");
      const label = text.trim();
      result.push({ id, label });
    }
  }

  return result;
}

export const TabContent: React.FC<TabContentProps> = ({ markdown }) => {
  const html = useMemo(() => marked.parse(markdown), [markdown]);
  const navigationItems = useMemo(() => findHeadingsWithSemVer(html), [html]);

  return (
    <TabWrapper>
      <TabInner>
        <TabAside>
          <UL>
            {navigationItems.map(({ label, id }) => (
              <LI key={id}>
                <A href={`#${id}`}>{label}</A>
              </LI>
            ))}
          </UL>
        </TabAside>
        <TabMain
          dangerouslySetInnerHTML={{
            __html: html,
          }}
        />
      </TabInner>
    </TabWrapper>
  );
};
