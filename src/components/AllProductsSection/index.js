import {Component} from 'react'
import Loader from 'react-loader-spinner'
import ProductCard from '../ProductCard'
import Cookies from 'js-cookie'
import './index.css'

class AllProductsSection extends Component {
  state = {
    productsList: [],
    isLoading: true,
    hasError: false,
  }

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/products'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    try {
      const response = await fetch(apiUrl, options)
      if (response.ok) {
        const fetchedData = await response.json()
        const updatedData = fetchedData.products.map(product => ({
          title: product.title,
          brand: product.brand,
          price: product.price,
          id: product.id,
          imageUrl: product.image_url,
          rating: product.rating,
        }))
        this.setState({productsList: updatedData, isLoading: false})
      } else {
        this.setState({isLoading: false, hasError: true})
      }
    } catch (error) {
      console.error('Fetch error:', error)
      this.setState({isLoading: false, hasError: true})
    }
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="Oval" color="#0b69ff" height={50} width={50} />
    </div>
  )

  renderProductsList = () => {
    const {productsList, isLoading, hasError} = this.state

    if (isLoading) return this.renderLoader()
    if (hasError)
      return <p className="error-message">Failed to load products.</p>

    return (
      <div>
        <h1 className="products-list-heading">All Products</h1>
        <ul className="products-list">
          {productsList.map(product => (
            <ProductCard productData={product} key={product.id} />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    return <>{this.renderProductsList()}</>
  }
}

export default AllProductsSection
