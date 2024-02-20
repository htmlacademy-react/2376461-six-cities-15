import MainPage from '../pages/main-page';
import { cardsData } from '../mock/card-data';

export default function App (): JSX.Element {


  return(
    <MainPage data={ cardsData }/>
  );

}
