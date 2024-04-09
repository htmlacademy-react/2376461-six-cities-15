import { useAppSelector } from '../store/helpers';
import { userSelectors } from '../store/slices/user';


export function useAuth(){
  const status = useAppSelector(userSelectors.authorizationStatus);

  return status;
}
