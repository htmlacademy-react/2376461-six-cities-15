import MainPage from '../pages/main-page';
import { cardsData } from '../mock/card-data';
import { CardType } from '../types';

export default function App (): JSX.Element {


  return(
    <MainPage data = { cardsData as CardType[] }/>
  );

}
