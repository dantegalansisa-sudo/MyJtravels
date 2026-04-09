import { useEffect, useState } from 'react';
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  type QueryConstraint,
} from 'firebase/firestore';
import { db } from '../firebase/config';

export function useCollection<T extends { id?: string }>(
  collectionName: string,
  activeOnly = true,
) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const constraints: QueryConstraint[] = [];
    if (activeOnly) constraints.push(where('active', '==', true));
    constraints.push(orderBy('order', 'asc'));

    const q = query(collection(db, collectionName), ...constraints);
    const unsub = onSnapshot(
      q,
      (snap) => {
        const items = snap.docs.map((d) => ({ id: d.id, ...d.data() } as T));
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
