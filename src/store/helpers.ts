import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { store } from './index.ts';
import { ActionCreatorsMapObject, bindActionCreators } from '@reduxjs/toolkit';
import { useMemo } from 'react';

type State = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

const useAppDispatch = () => useDispatch<AppDispatch>();

const useAppSelector: TypedUseSelectorHook<State> = useSelector;

const useActionCreators = <Actions extends ActionCreatorsMapObject>(actions: Actions) => {
  const dispatch = useDispatch();

  return useMemo(() => bindActionCreators(actions, dispatch), [actions,dispatch]);
};

export {
  useAppDispatch,
  useAppSelector,
  useActionCreators
};
