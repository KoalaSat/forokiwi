import NDK, { NDKEvent, NDKNip07Signer, NDKUserProfile } from '@nostr-dev-kit/ndk';
import {
  createContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

export interface NostrContextProviderProps {
  children: ReactNode;
}

export interface UseNostrStoreType {
  ndk: NDK
  userProfile?: NDKUserProfile | null
  authors: Record<string, NDKUserProfile>
  saveAuthors: (authors: Record<string, NDKUserProfile>) => void
  forums: Record<string, NDKEvent>
  saveForums: (authors: Record<string, NDKEvent>) => void
  topics: Record<string, NDKEvent>
  saveTopics: (authors: Record<string, NDKEvent>) => void
  comments: Record<string, NDKEvent[]>
  saveComments: (authors: Record<string, NDKEvent[]>) => void
  reactions: Record<string, NDKEvent[]>
  saveReactions: (authors: Record<string, NDKEvent[]>) => void
}

export const initialNostrContext: UseNostrStoreType = {
  ndk: new NDK({
    explicitRelayUrls: ["wss://offchain.pub", "wss://nos.lol", "wss://nostr.satstralia.com"],
  }),
  authors: {},
  saveAuthors: () => { },
  forums: {},
  saveForums: () => { },
  topics: {},
  saveTopics: () => { },
  comments: {},
  saveComments: () => { },
  reactions: {},
  saveReactions: () => { }
};

export const NostrContext = createContext<UseNostrStoreType>(initialNostrContext);

export const NostrContextProvider = ({ children }: NostrContextProviderProps): JSX.Element => {
  const [ndk] = useState<NDK>(initialNostrContext.ndk);
  const [authors, setAuthors] = useState<Record<string, NDKUserProfile>>(JSON.parse(window.localStorage.getItem('authors') ?? '{}'))
  const [forums, setForums] = useState<Record<string, NDKEvent>>({})
  const [topics, setTopics] = useState<Record<string, NDKEvent>>({})
  const [comments, setComments] = useState<Record<string, NDKEvent[]>>({})
  const [reactions, setReactions] = useState<Record<string, NDKEvent[]>>({})
  const [userProfile, setUserProfile] = useState<NDKUserProfile | null>()

  useEffect(() => {
    const signer = new NDKNip07Signer()
    ndk.signer = signer
    ndk.autoConnectUserRelays = true
    ndk.connect().then(() => {
      ndk.activeUser?.fetchProfile().then((u) => {
        if (u) {
          setUserProfile(u)
        } else {
          setUserProfile(null)
        }
      })
    });
  }, [])

  const saveAuthors = (authors: Record<string, NDKUserProfile>): void => {
    setAuthors((auth) => {
      const result = { ...auth, ...authors }
      window.sessionStorage.setItem('authors', JSON.stringify(result));
      return result
    })
  }

  const saveForums = (authors: Record<string, NDKEvent>): void => {
    setForums((list) => {
      return { ...list, ...authors }
    })
  }

  const saveTopics = (topics: Record<string, NDKEvent>): void => {
    setTopics((list) => {
      return { ...list, ...topics }
    })
  }

  const saveComments = (comments: Record<string, NDKEvent[]>): void => {
    setComments((list) => {
      Object.keys(comments).forEach((dTag) => {
        list[dTag] = [...(list[dTag] ?? []), ...comments[dTag]]
          .filter((item, index, self) =>
            index === self.findIndex((t) => (
              t.id === item.id
            ))
          )
          .sort((a, b) => {
            return new Date(a.created_at ?? 0).getTime() - new Date(b.created_at ?? 0).getTime();
          })
      })
      return list
    })
  }

  const saveReactions = (reactions: Record<string, NDKEvent[]>): void => {
    setReactions((list) => {
      Object.keys(reactions).forEach((dTag) => {
        list[dTag] = [...(list[dTag] ?? []), ...reactions[dTag]].filter((item, index, self) =>
          index === self.findIndex((t) => (
            t.id === item.id
          ))
        )
      })
      return list
    })
  }

  return (
    <NostrContext.Provider
      value={{
        ndk,
        userProfile,
        authors,
        saveAuthors,
        forums,
        saveForums,
        topics,
        saveTopics,
        comments,
        saveComments,
        reactions,
        saveReactions
      }}
    >
      {children}
    </NostrContext.Provider>
  )
};
