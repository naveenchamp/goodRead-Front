import {useState, useEffect} from 'react'
import Loader from 'react-loader-spinner'

import BookCard from '../BookCard'

import './index.css'

const initialBooksData = [
  {
    book_id: 1,
    title: 'Harry Potter and the Sorcerers Stone',
    authorId: 1,
    rating: 4.48,
    ratingCount: 7464819,
    reviewCount: 118312,
    description:
      'Harry Potters life is miserable. His parents are dead and hes stuck with his heartless relatives.',
    pages: 309,
    dateOfPublication: 'November 1st 2003',
    editionLanguage: 'English',
    price: 750,
    onlineStores: 'Amazon, Audible,Google play, Indigo,Abebooks',
  },
  {
    book_id: 14,
    title: 'The Return of the King',
    authorId: 3,
    rating: 4.53,
    ratingCount: 708740,
    reviewCount: 10976,
    description:
      'In the third volume of The Lord of the Rings trilogy the good and evil forces join battle.',
    pages: 385,
    dateOfPublication: 'July 12th 1974',
    editionLanguage: 'English',
    price: 1050,
    onlineStores:
      'Amazon, Apple Books,Google play, Indigo,Abebooks,Walmart eBooks,Audible',
  },
  {
    book_id: 13,
    title: 'The Two Towers',
    authorId: 3,
    rating: 4.45,
    ratingCount: 754093,
    reviewCount: 11640,
    description:
      'Frodo and his Companions of the Ring have been beset by danger.',
    pages: 447,
    dateOfPublication: 'September 12th 1974',
    editionLanguage: 'English',
    price: 650,
    onlineStores:
      'Amazon, Apple Books,Google play, Indigo,Abebooks,Walmart eBooks,Audible',
  },
]

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
      <div class='books-list-container'>
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
