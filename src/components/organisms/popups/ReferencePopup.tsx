import { $activeReferences } from '@/stores/referenceStore';
import { useStore } from '@nanostores/react';
import { FC } from 'react';
import tw from 'twin.macro';

export const ReferencePopup: FC = () => {
  const references = useStore($activeReferences);

  return (
    <div>
      {references.length > 0 ? (
        <List>
          {references.map((reference) => (
            <Item key={reference.id}>{reference.content}</Item>
          ))}
        </List>
      ) : (
        <p>No references are associated with this page.</p>
      )}
    </div>
  );
};

const List = tw.ol`list-decimal list-outside mt-4 ml-4 marker:font-bold`;
const Item = tw.li`text-brand-dark-gray`;
