import { useDispatch } from 'react-redux';
import { APPdispatch } from '../store';


export const useAppDispatch = () => useDispatch<APPdispatch>();
