import {BsSearch} from 'react-icons/bs'
import './index.css'

const FiltersGroup = props => {
  const {
    ratingsList,
    changeRating,
    activeRatingId,
    categoryOptions,
    changeCategory,
    activeCategoryId,
    changeSearchInput,
    searchInput,
    clearFilter,
  } = props

  const renderRatingsFiltersList = () => {
    return ratingsList.map(rating => {
      const isActive = activeRatingId === rating.ratingId
      const ratingClassName = isActive ? 'and-up active-rating' : 'and-up'

      const onClickRatingItem = () => changeRating(rating.ratingId)

      return (
        <li
          className="rating-item"
          key={rating.ratingId}
          onClick={onClickRatingItem}
        >
          <img
            src={rating.imageUrl}
            alt={`rating ${rating.ratingId}`}
            className="rating-img"
          />
          <p className={ratingClassName}>& up</p>
        </li>
      )
    })
  }

  const renderRatingsFilters = () => (
    <div className="ratings-group">
      <h1 className="rating-heading">Rating</h1>
      <ul className="ratings-list">{renderRatingsFiltersList()}</ul>
    </div>
  )

  const renderCategoriesList = () => {
    return categoryOptions.map(category => {
      const isActive = category.categoryId === activeCategoryId
      const categoryClassName = isActive
        ? 'category-name active-category-name'
        : 'category-name'

      const onClickCategoryItem = () => changeCategory(category.categoryId)

      return (
        <li
          className="category-item"
          key={category.categoryId}
          onClick={onClickCategoryItem}
        >
          <button className="button-styling">
            <p className={categoryClassName}>{category.name}</p>
          </button>
        </li>
      )
    })
  }

  const renderProductCategories = () => (
    <div className="categories-group">
      <h1 className="category-heading">Category</h1>
      <ul className="categories-list">{renderCategoriesList()}</ul>
    </div>
  )

  const onEnterSearchInput = event => {
    const {enterSearchInput} = props
    if (event.key === 'Enter') {
      enterSearchInput()
    }
  }

  const onChangeSearch = event => {
    changeSearchInput(event.target.value)
  }

  const renderSearchInput = () => {
    const {enterSearchInput} = props
    return (
      <div className="search-input-container">
        <input
          type="search"
          value={searchInput}
          className="search-input"
          placeholder="Search"
          onChange={onChangeSearch}
          onKeyDown={onEnterSearchInput}
        />
        <BsSearch className="search-icon" onClick={enterSearchInput} />
      </div>
    )
  }

  return (
    <div className="filters-group-container">
      {renderSearchInput()}
      {renderProductCategories()}
      {renderRatingsFilters()}
      <button
        className="clear-filter-button"
        type="button"
        onClick={clearFilter}
      >
        Clear Filters
      </button>
    </div>
  )
}

export default FiltersGroup
