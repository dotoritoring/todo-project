import ListContainer from "./components/ListContainer";
import "./styles/style.scss";
function App() {
  console.log(process.env.REACT_APP_MODE);
  return (
    <main>
      <ListContainer></ListContainer>
    </main>
  );
}

export default App;
