import type { ComponentPropsWithoutRef } from 'react'
import type { MDXComponents } from 'mdx/types'
import { AcDemontre, Preuves, TitreSectionFiche } from './ComposantsFiche'

/** Correspondance Markdown → composants stylés, plus les composants utilisables dans le MDX */
export const composantsFiche: MDXComponents = {
  h2: ({ children }) => <TitreSectionFiche>{children}</TitreSectionFiche>,
  h3: (props: ComponentPropsWithoutRef<'h3'>) => <h3 className="mt-8 font-serif text-[26px] leading-tight font-medium" {...props} />,
  p: (props: ComponentPropsWithoutRef<'p'>) => <p className="mt-2 max-w-[860px] text-[16px] leading-relaxed text-texte-secondaire" {...props} />,
  ul: (props: ComponentPropsWithoutRef<'ul'>) => <ul className="mt-2 max-w-[860px] list-disc pl-5 text-texte-secondaire" {...props} />,
  ol: (props: ComponentPropsWithoutRef<'ol'>) => <ol className="mt-2 max-w-[860px] list-decimal pl-5 text-texte-secondaire" {...props} />,
  li: (props: ComponentPropsWithoutRef<'li'>) => <li className="mt-1 leading-relaxed" {...props} />,
  a: (props: ComponentPropsWithoutRef<'a'>) => <a className="text-texte-meta underline underline-offset-4 hover:text-texte-ornement" {...props} />,
  strong: (props: ComponentPropsWithoutRef<'strong'>) => <strong className="font-semibold text-texte-principal" {...props} />,
  AcDemontre,
  Preuves,
}
