import {useState, useEffect} from 'react'
import Loader from 'react-loader-spinner'

import BookCard from '../BookCard'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const BooksList = () => {
  const [apiResponse, setApiResponse] = useState({
    status: apiStatusConstants.initial,
    data: null,
    errorMsg: null,
  })

  // Writing useEffect() to make API call
  useEffect(() => {
    const getBooks = async () => {
      // Before the fetch operation, set API status to inProgress
      setApiResponse({
        status: apiStatusConstants.inProgress,
        data: null,
        errorMsg: null,
      })
      // Making API call
      const apiUrl = `https://naveenreddytippasanincnxhrjscpfx3ox.drops.nxtwave.tech/books/`

      const response = await fetch(apiUrl)
      const fetchedData = await response.json()

      if (response.ok) {
        const formattedData = fetchedData.map(book => ({
          bookId: book.book_id,
          title: book.title,
          authorId: book.author_id,
          rating: book.rating,
          ratingCount: book.rating_count,
          reviewCount: book.review_count,
          description: book.description,
          pages: book.pages,
          dateOfPublication: book.date_of_publication,
          editionLanguage: book.edition_language,
          price: book.price,
          onlineStores: book.online_stores,
        }))
        // Set API status to success and store the formatted data
        setApiResponse(prevApiDetails => ({
          ...prevApiDetails,
          status: apiStatusConstants.success,
          data: formattedData,
        }))
      } else {
        // If response is not successful, set API status to failure and store the error message
        setApiResponse(prevApiDetails => ({
          ...prevApiDetails,
          status: apiStatusConstants.failure,
          errorMsg: fetchedData.error_msg,
        }))
      }
    }

    // Call the async function inside useEffect
    getBooks()
  }, [])

  const renderLoadingView = () => (
    <div className='products-loader-container'>
      <Loader type='ThreeDots' color='#0b69ff' height='50' width='50' />
    </div>
  )
  const renderBooksListView = () => {
    const {data} = apiResponse
    return (
      <div className='books-list-container'>
        <ul className='books-list'>
          {data.map(book => (
            <BookCard key={book.book_id} book={book} />
          ))}
        </ul>
      </div>
    )
  }
  const renderFailureView = () => {
    return <div>Something Went Wrong</div>
  }

  const renderBooks = () => {
    const {status} = apiResponse
    switch (status) {
      case apiStatusConstants.success:
        return renderBooksListView()
      case apiStatusConstants.failure:
        return renderFailureView()
      case apiStatusConstants.inProgress:
        return renderLoadingView()
      default:
        return null
    }
  }

  return <>{renderBooks()}</>
}

export default BooksList
