import './App.css';
import Navbar from './components/Navbar';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'
import MyList from './pages/MyList'
import PokemonList from './pages/PokemonList'
import PokemonDetail from './pages/PokemonDetail'
import { 
  ApolloClient, 
  ApolloProvider,
  InMemoryCache,
  HttpLink,
  from,
} from '@apollo/client'

const link = from([
  new HttpLink({ uri: 'https://graphql-pokeapi.vercel.app/api/graphql' })
])
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        PokemonList: {
          results: {
            merge(existing = [], incoming) {
              return [...existing, ...incoming]
            },
          }
        }
      }
    }
  }
})

const client = new ApolloClient({
  cache,
  link,
})

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/my-list' element={<MyList />} />
          <Route path='/' exact element={<PokemonList />} />
          <Route path='/pokemon-detail' element={<PokemonDetail />} />
        </Routes>
      </Router>
    </ ApolloProvider>    
  );
}

export default App;
