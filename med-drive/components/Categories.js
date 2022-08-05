import { ScrollView, View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import CategoryCard from './CategoryCard'

const Categories = () => {
  const [ categories, setCategories] = useState([]);

  useEffect(() => {

  })
  return (
    <ScrollView horizontal
    contentContainerStyle= {{
      paddingHorizontal: 15,
      paddingTop: 10,
    }}
    showsHorizontalScrollIndicator={false}>
      {/* Category Card */}
      {categories.map(category => (
        <CategoryCard
          key={category._id}
          id={category._id}
          imgUrl={urlFor(category.image).width(200).url()}
          title={category.name}
        />
      ))}
      </ScrollView>
  )
}

export default Categories