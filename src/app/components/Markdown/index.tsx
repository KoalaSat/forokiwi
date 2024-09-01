import { NDKUser, filterFromId } from "@nostr-dev-kit/ndk";
import { Skeleton, Typography, Image, Col, Layout, Row, theme } from "antd";
import { UseNostrStoreType, NostrContext } from "app/contexts/NostrContext";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { visit } from 'unist-util-visit';

const { Link } = Typography;

interface MarkdownProps {
  text: string
  dTag?: string
  loadingAuthors?: boolean
}

export const Markdown: React.FC<MarkdownProps> = ({ text, dTag, loadingAuthors }) => {
  const {
    token: { colorBgLayout, colorTextSecondary },
  } = theme.useToken();
  const { authors, comments } = useContext<UseNostrStoreType>(NostrContext);
  const { t } = useTranslation()
  const markdownComponent = {
    a: props => {
      return <Link target="_blank" href={props.href}>{props.children}</Link>
    },
    img: props => {
      return <Image
        src={props.src}
        fallback="data:image/png;base64,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"
      />
    },
  }

  const extractMatchesWithPositions = (text, regexp): string[] => {
    const matches = text.match(regexp);
    const result: string[] = [];
    let lastIndex = 0;

    if (!matches) return [text];

    for (const match of matches) {
      const matchIndex = text.indexOf(match, lastIndex);
      if (matchIndex > lastIndex) {
        result.push(text.slice(lastIndex, matchIndex));
      }
      result.push(match);
      lastIndex = matchIndex + match.length;
    }

    if (lastIndex < text.length) {
      result.push(text.slice(lastIndex));
    }

    return result;
  }

  const mentionComponent = (index: number, npub: string): JSX.Element => {
    const user = new NDKUser({ npub })
    const profile = authors?.[user.pubkey] ?? user?.profile
    const name: string = profile?.displayName ?? profile?.name ?? t("shared.events.anonymous")
    return loadingAuthors ?
      <Skeleton.Input size="small" active />
      : <Link target="_blank" href='/' key={index}>{name}</Link>
  }

  const eventComponent = (index: number, nevent: string): JSX.Element => {
    let eventText
    if (dTag) {
      const eventId = filterFromId(nevent)?.['#e']?.[0]
      eventText = comments[dTag].find(c => c.id === eventId)
    }
    return (
      <Layout style={{ background: colorBgLayout, padding: 25, marginBottom: 10, borderLeftColor: colorTextSecondary, borderLeftWidth: 5, borderLeftStyle: 'solid' }}>
        <Row>
          <Col>
            <Skeleton active loading={!eventText}>
              {eventText}
            </Skeleton>
          </Col>
        </Row>
      </Layout>
    )
  }

  const mentionSyntax = (): (tree: any) => void => {
    return (tree) => {
      visit(tree, 'text', (node) => {
        const regex = /nostr:npub1[a-z0-9]{32,}/g
        const parts = extractMatchesWithPositions(node.value, regex);

        if (parts.length > 1) {
          node.type = 'root'; // Change the node type to root to allow multiple children
          node.children = []

          parts.forEach((part, index) => {
            if (index % 2 === 1) {
              // This is the matched custom syntax part
              node.children.push({
                type: 'custom', // Custom node type
                value: mentionComponent(index, part.replace("nostr:", "")), // The content inside the custom syntax
              });
            } else if (part) {
              node.children.push({
                type: 'text',
                value: part,
              });
            }
          });
        }
      });
    };
  };

  const eventSyntax = (): (tree: any) => void => {
    return (tree) => {
      visit(tree, 'text', (node) => {
        const regex = /nostr:nevent[a-z0-9]{31,}/g
        const parts = extractMatchesWithPositions(node.value, regex);

        if (parts.length > 1) {
          node.type = 'root'; // Change the node type to root to allow multiple children
          node.children = []

          parts.forEach((part, index) => {
            if (index % 2 === 1) {
              // This is the matched custom syntax part
              node.children.push({
                type: 'custom', // Custom node type
                value: eventComponent(index, part.replace("nostr:", "")), // The content inside the custom syntax
              });
            } else if (part) {
              node.children.push({
                type: 'text',
                value: part,
              });
            }
          });
        }
      });
    };
  };

  const parseHTML = (): string => {
    return text.replace(/<img\s+src="([^"]+)"\s*[^>]*>/g, (match, src) => {
      const altText = 'Image';
      return `![${altText}](${src})`;
  });
  }

  return (
    <ReactMarkdown remarkPlugins={[remarkGfm, mentionSyntax, eventSyntax]} className={"markdown-container"} components={markdownComponent}>
      {parseHTML()}
    </ReactMarkdown>
  )
}
