import BooksList from './components/BooksList'

const App = () => {
  return (
    <div class="bg-container">
      <div className="landing-section">
        <h1 class="heading">Good Reads</h1>
        <p class="quote">Meet Your Next Favourite Book</p>
      </div>

      <BooksList />
    </div>
  )
}
export default App
