import { atom, computed } from 'nanostores';
import { references, type ReferenceId } from '@/data/references';

export const $activeReferenceIds = atom<ReferenceId[]>([]);

export const $activeReferences = computed($activeReferenceIds, (ids) =>
  ids.map((id) => ({
    id,
    content: references[id],
  })),
);

export function setActiveReferences(ids: ReferenceId[]): void {
  $activeReferenceIds.set(ids);
}

export function clearActiveReferences(): void {
  $activeReferenceIds.set([]);
}
