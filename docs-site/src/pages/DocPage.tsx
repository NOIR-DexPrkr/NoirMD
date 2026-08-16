import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import DocShell from '../components/docs/DocShell';
import { loadDoc } from '../data/docs';
import { DOC_GROUPS, DEFAULT_SLUG } from '../data/docsIndex';

const DocPage: React.FC = () => {
  const { slug = DEFAULT_SLUG } = useParams();
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const entry = DOC_GROUPS.flatMap(g =>
    g.docs.filter(d => d.slug === slug).map(d => ({ doc: d, group: g.title }))
  )[0];

  useEffect(() => {
    setIsLoading(true);
    setContent('');
    window.scrollTo({ top: 0 });
    document.title = `${entry ? entry.doc.title : 'NoirMD'} | NoirMD — Documentación`;
    loadDoc(slug)
      .then(setContent)
      .catch(() => setContent(''))
      .finally(() => setIsLoading(false));
  }, [slug]);

  if (!entry) return <Navigate to={`/docs/${DEFAULT_SLUG}`} replace />;

  return (
    <DocShell
      slug={slug}
      title={entry.doc.title}
      groupTitle={entry.group}
      content={content}
      isLoading={isLoading}
    />
  );
};

export default DocPage;