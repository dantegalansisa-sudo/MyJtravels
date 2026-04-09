import { useEffect, useState } from 'react';
import {
  collection,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { db } from '../firebase/config';

export function useCollection<T extends { id?: string; order?: number; active?: boolean }>(
  collectionName: string,
  activeOnly = true,
) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, collectionName),
      (snap) => {
        let items = snap.docs.map((d) => ({ id: d.id, ...d.data() } as T));
        if (activeOnly) items = items.filter((i) => i.active !== false);
        items.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
        setData(items);
        setLoading(false);
      },
      () => setLoading(false),
    );
    return unsub;
  }, [collectionName, activeOnly]);

  const add = async (item: Omit<T, 'id'>) => {
    await addDoc(collection(db, collectionName), item);
  };

  const update = async (id: string, item: Partial<T>) => {
    await updateDoc(doc(db, collectionName, id), item as Record<string, unknown>);
  };

  const remove = async (id: string) => {
    await deleteDoc(doc(db, collectionName, id));
  };

  return { data, loading, add, update, remove };
}
