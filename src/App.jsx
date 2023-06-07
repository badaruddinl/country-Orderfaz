import { BrowserRouter, Routes, Route } from 'react-router-dom';
import store from './redux/store';
import { Provider } from 'react-redux';
import Index from './Pages/Index';
import Detail from './Pages/Detail';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/detail" element={<Detail />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
